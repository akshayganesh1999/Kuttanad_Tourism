export const selectItinerary = (state) => state.itinerary;

export const selectEstimatedPrice = (state) => {
  const { houseboat, activities, travelDetails } = state.itinerary;
  const nights = Math.max((travelDetails.numberOfDays || 1) - 1, 1);

  const accommodationCost = houseboat
    ? houseboat.pricePerNight
      ? houseboat.pricePerNight * nights
      : houseboat.pricePerPerson || 0
    : 0;

  const activitiesCost = activities.reduce((sum, a) => sum + (a.price || 0), 0);

  return accommodationCost + activitiesCost;
};

export const selectIsItineraryEmpty = (state) => {
  const { houseboat, destinations, activities, travelDetails } = state.itinerary;
  return !houseboat && destinations.length === 0 && activities.length === 0 && !travelDetails.startDate;
};
