import { createSlice } from '@reduxjs/toolkit';

export const ITINERARY_STORAGE_KEY = 'kuttanad_itinerary_draft';

const initialState = {
  step: 1,
  travelDetails: {
    startDate: '',
    endDate: '',
    numberOfDays: 0,
    guests: 2,
  },
  accommodation: '', // 'Houseboat' | 'Homestay' | 'Resort' | 'Villa' | 'Apartment'
  houseboat: null, // the selected Property object
  destinations: [], // selected Destination objects
  activities: [], // selected Activity objects
  days: [], // [{ id, dayNumber, title, notes, destinationIds:[], activityIds:[] }]
  preferences: {
    foodPreference: '',
    groupType: '',
    acPreference: '',
    budgetPreference: '',
    transportation: '',
  },
  specialRequirements: '',
  contactDetails: {
    customerName: '',
    phone: '',
    email: '',
  },
};

export const itineraryInitialState = initialState;


export const sanitizeItineraryState = (raw) => {
  if (!raw || typeof raw !== 'object') return initialState;

  const rawStep = Number(raw.step);
  const step = Number.isInteger(rawStep) && rawStep >= 1 && rawStep <= 6 ? rawStep : 1;

  return {
    ...initialState,
    ...raw,
    step,
    travelDetails: { ...initialState.travelDetails, ...raw.travelDetails },
    preferences: { ...initialState.preferences, ...raw.preferences },
    contactDetails: { ...initialState.contactDetails, ...raw.contactDetails },
    destinations: Array.isArray(raw.destinations) ? raw.destinations : [],
    activities: Array.isArray(raw.activities) ? raw.activities : [],
    days: Array.isArray(raw.days) ? raw.days : [],
  };
};

const arrayMove = (arr, from, to) => {
  if (to < 0 || to >= arr.length || from === to) return;
  const [item] = arr.splice(from, 1);
  arr.splice(to, 0, item);
};


const buildDaysFromState = (state) => {
  const numberOfDays = Math.max(state.travelDetails.numberOfDays || 0, 0);
  if (numberOfDays === 0) return [];

  const days = Array.from({ length: numberOfDays }, (_, i) => ({
    id: `day-${i + 1}`,
    dayNumber: i + 1,
    title:
      i === 0
        ? 'Arrival Day'
        : i === numberOfDays - 1 && numberOfDays > 1
        ? 'Departure Day'
        : `Day ${i + 1}`,
    notes: '',
    destinationIds: [],
    activityIds: [],
  }));

  state.destinations.forEach((dest, idx) => {
    days[idx % numberOfDays].destinationIds.push(dest._id);
  });
  state.activities.forEach((act, idx) => {
    days[idx % numberOfDays].activityIds.push(act._id);
  });

  return days;
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = Math.min(Math.max(action.payload, 1), 6);
    },
    nextStep(state) {
      state.step = Math.min(state.step + 1, 6);
    },
    prevStep(state) {
      state.step = Math.max(state.step - 1, 1);
    },
    setTravelDetails(state, action) {
      Object.assign(state.travelDetails, action.payload);
      const { startDate, endDate } = state.travelDetails;
      if (startDate && endDate) {
        const diff = Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1;
        state.travelDetails.numberOfDays = diff > 0 ? diff : 0;
      } else {
        state.travelDetails.numberOfDays = 0;
      }
    },
    setAccommodationType(state, action) {
      state.accommodation = action.payload;
      if (state.houseboat && state.houseboat.propertyType !== action.payload) {
        state.houseboat = null;
      }
    },
    selectHouseboat(state, action) {
      state.houseboat = action.payload;
      if (action.payload) {
        state.accommodation = action.payload.propertyType;
      }
    },
    toggleDestination(state, action) {
      const destination = action.payload;
      const exists = state.destinations.some((d) => d._id === destination._id);
      if (exists) {
        state.destinations = state.destinations.filter((d) => d._id !== destination._id);
        state.days.forEach((day) => {
          day.destinationIds = day.destinationIds.filter((id) => id !== destination._id);
        });
      } else {
        state.destinations.push(destination);
      }
    },
    toggleActivity(state, action) {
      const activity = action.payload;
      const exists = state.activities.some((a) => a._id === activity._id);
      if (exists) {
        state.activities = state.activities.filter((a) => a._id !== activity._id);
        state.days.forEach((day) => {
          day.activityIds = day.activityIds.filter((id) => id !== activity._id);
        });
      } else {
        state.activities.push(activity);
      }
    },
    setPreferences(state, action) {
      Object.assign(state.preferences, action.payload);
    },
    setSpecialRequirements(state, action) {
      state.specialRequirements = action.payload;
    },
    setContactDetails(state, action) {
      Object.assign(state.contactDetails, action.payload);
    },
    generateDays(state) {
      state.days = buildDaysFromState(state);
    },
    updateDayTitle(state, action) {
      const { dayIndex, title } = action.payload;
      if (state.days[dayIndex]) state.days[dayIndex].title = title;
    },
    updateDayNotes(state, action) {
      const { dayIndex, notes } = action.payload;
      if (state.days[dayIndex]) state.days[dayIndex].notes = notes;
    },
    addDestinationToDay(state, action) {
      const { dayIndex, destinationId } = action.payload;
      const day = state.days[dayIndex];
      if (day && !day.destinationIds.includes(destinationId)) {
        day.destinationIds.push(destinationId);
      }
    },
    removeDestinationFromDay(state, action) {
      const { dayIndex, destinationId } = action.payload;
      const day = state.days[dayIndex];
      if (day) day.destinationIds = day.destinationIds.filter((id) => id !== destinationId);
    },
    addActivityToDay(state, action) {
      const { dayIndex, activityId } = action.payload;
      const day = state.days[dayIndex];
      if (day && !day.activityIds.includes(activityId)) {
        day.activityIds.push(activityId);
      }
    },
    removeActivityFromDay(state, action) {
      const { dayIndex, activityId } = action.payload;
      const day = state.days[dayIndex];
      if (day) day.activityIds = day.activityIds.filter((id) => id !== activityId);
    },
    reorderDestinationInDay(state, action) {
      const { dayIndex, fromIndex, toIndex } = action.payload;
      const day = state.days[dayIndex];
      if (day) arrayMove(day.destinationIds, fromIndex, toIndex);
    },
    reorderActivityInDay(state, action) {
      const { dayIndex, fromIndex, toIndex } = action.payload;
      const day = state.days[dayIndex];
      if (day) arrayMove(day.activityIds, fromIndex, toIndex);
    },
    moveDestinationToDay(state, action) {
      const { fromDayIndex, toDayIndex, destinationId } = action.payload;
      const fromDay = state.days[fromDayIndex];
      const toDay = state.days[toDayIndex];
      if (!fromDay || !toDay) return;
      fromDay.destinationIds = fromDay.destinationIds.filter((id) => id !== destinationId);
      if (!toDay.destinationIds.includes(destinationId)) {
        toDay.destinationIds.push(destinationId);
      }
    },
    moveActivityToDay(state, action) {
      const { fromDayIndex, toDayIndex, activityId } = action.payload;
      const fromDay = state.days[fromDayIndex];
      const toDay = state.days[toDayIndex];
      if (!fromDay || !toDay) return;
      fromDay.activityIds = fromDay.activityIds.filter((id) => id !== activityId);
      if (!toDay.activityIds.includes(activityId)) {
        toDay.activityIds.push(activityId);
      }
    },
    resetItinerary() {
      return initialState;
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setTravelDetails,
  setAccommodationType,
  selectHouseboat,
  toggleDestination,
  toggleActivity,
  setPreferences,
  setSpecialRequirements,
  setContactDetails,
  generateDays,
  updateDayTitle,
  updateDayNotes,
  addDestinationToDay,
  removeDestinationFromDay,
  addActivityToDay,
  removeActivityFromDay,
  reorderDestinationInDay,
  reorderActivityInDay,
  moveDestinationToDay,
  moveActivityToDay,
  resetItinerary,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;