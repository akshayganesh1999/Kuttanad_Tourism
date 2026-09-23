import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronUp, ChevronDown, X, RefreshCw } from 'lucide-react';
import {
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
} from '../itinerarySlice';

const findById = (list, id) => list.find((item) => item._id === id);


const ItemRow = ({ label, onRemove, onMoveUp, onMoveDown, onMoveToDay, dayOptions, disableUp, disableDown }) => (
  <div className="flex items-center justify-between gap-2 rounded-lg border border-backwater-100 bg-backwater-50/40 px-3 py-2 text-sm">
    <span className="line-clamp-1 font-medium text-backwater-900">{label}</span>
    <div className="flex flex-shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={onMoveUp}
        disabled={disableUp}
        aria-label="Move up"
        className="rounded p-1 text-charcoal-800/60 hover:bg-backwater-100 disabled:opacity-30"
      >
        <ChevronUp size={14} />
      </button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={disableDown}
        aria-label="Move down"
        className="rounded p-1 text-charcoal-800/60 hover:bg-backwater-100 disabled:opacity-30"
      >
        <ChevronDown size={14} />
      </button>
      {dayOptions.length > 0 && (
        <select
          onChange={(e) => e.target.value !== '' && onMoveToDay(Number(e.target.value))}
          value=""
          className="rounded border border-backwater-100 bg-white px-1 py-1 text-xs text-charcoal-800 outline-none"
        >
          <option value="">Move to…</option>
          {dayOptions.map((d) => (
            <option key={d.dayIndex} value={d.dayIndex}>{`Day ${d.dayNumber}`}</option>
          ))}
        </select>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="rounded p-1 text-charcoal-800/50 hover:bg-red-50 hover:text-red-600"
      >
        <X size={14} />
      </button>
    </div>
  </div>
);

const StepReview = () => {
  const dispatch = useDispatch();
  const { days, destinations, activities, travelDetails } = useSelector((s) => s.itinerary);
  const [confirmingRegenerate, setConfirmingRegenerate] = useState(false);

  useEffect(() => {
    if (days.length === 0 && travelDetails.numberOfDays > 0) {
      dispatch(generateDays());
    }
  }, []);

  const handleRegenerate = () => {
    dispatch(generateDays());
    setConfirmingRegenerate(false);
  };

  const unassignedDestinations = destinations.filter(
    (d) => !days.some((day) => day.destinationIds.includes(d._id))
  );
  const unassignedActivities = activities.filter(
    (a) => !days.some((day) => day.activityIds.includes(a._id))
  );

  const dayOptionsFor = (currentIndex) =>
    days
      .map((d, idx) => ({ dayNumber: d.dayNumber, dayIndex: idx }))
      .filter((d) => d.dayIndex !== currentIndex);

  if (!travelDetails.numberOfDays) {
    return (
      <div className="rounded-2xl border border-dashed border-backwater-200 bg-backwater-50/50 p-8 text-center text-charcoal-800">
        Set your travel dates in Step 1 before reviewing your itinerary.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-backwater-900">
            Review Your Itinerary
          </h2>
          <p className="mt-1 text-sm text-charcoal-800/80">
            We&apos;ve drafted a day-by-day plan. Rearrange, add, or remove anything you like.
          </p>
        </div>

        {days.length > 0 &&
          (confirmingRegenerate ? (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-charcoal-800">Discard your edits and rebuild?</span>
              <button
                type="button"
                onClick={handleRegenerate}
                className="rounded-full bg-red-600 px-3 py-1.5 text-white"
              >
                Yes, rebuild
              </button>
              <button
                type="button"
                onClick={() => setConfirmingRegenerate(false)}
                className="rounded-full border border-backwater-100 px-3 py-1.5"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingRegenerate(true)}
              className="inline-flex items-center gap-2 rounded-full border border-backwater-100 bg-white px-4 py-2 text-sm font-medium text-backwater-900"
            >
              <RefreshCw size={14} /> Regenerate
            </button>
          ))}
      </div>

      <div className="space-y-6">
        {days.map((day, dayIndex) => (
          <div key={day.id} className="rounded-2xl border border-backwater-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <input
                value={day.title}
                onChange={(e) => dispatch(updateDayTitle({ dayIndex, title: e.target.value }))}
                className="font-display text-lg font-semibold text-backwater-900 outline-none"
              />
              <span className="text-xs font-medium uppercase tracking-wide text-backwater-500">
                Day {day.dayNumber}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold text-backwater-900">Destinations</p>
                <div className="space-y-2">
                  {day.destinationIds.map((id, idx) => {
                    const dest = findById(destinations, id);
                    if (!dest) return null;
                    return (
                      <ItemRow
                        key={id}
                        label={dest.name}
                        disableUp={idx === 0}
                        disableDown={idx === day.destinationIds.length - 1}
                        onMoveUp={() =>
                          dispatch(reorderDestinationInDay({ dayIndex, fromIndex: idx, toIndex: idx - 1 }))
                        }
                        onMoveDown={() =>
                          dispatch(reorderDestinationInDay({ dayIndex, fromIndex: idx, toIndex: idx + 1 }))
                        }
                        onRemove={() => dispatch(removeDestinationFromDay({ dayIndex, destinationId: id }))}
                        onMoveToDay={(toDayIndex) =>
                          dispatch(moveDestinationToDay({ fromDayIndex: dayIndex, toDayIndex, destinationId: id }))
                        }
                        dayOptions={dayOptionsFor(dayIndex)}
                      />
                    );
                  })}
                  {day.destinationIds.length === 0 && (
                    <p className="text-xs text-charcoal-800/50">None yet.</p>
                  )}
                </div>
                {unassignedDestinations.length > 0 && (
                  <select
                    onChange={(e) =>
                      e.target.value && dispatch(addDestinationToDay({ dayIndex, destinationId: e.target.value }))
                    }
                    value=""
                    className="mt-2 w-full rounded-lg border border-dashed border-backwater-200 px-3 py-2 text-sm text-charcoal-800 outline-none"
                  >
                    <option value="">+ Add a destination</option>
                    {unassignedDestinations.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-backwater-900">Experiences</p>
                <div className="space-y-2">
                  {day.activityIds.map((id, idx) => {
                    const act = findById(activities, id);
                    if (!act) return null;
                    return (
                      <ItemRow
                        key={id}
                        label={act.name}
                        disableUp={idx === 0}
                        disableDown={idx === day.activityIds.length - 1}
                        onMoveUp={() =>
                          dispatch(reorderActivityInDay({ dayIndex, fromIndex: idx, toIndex: idx - 1 }))
                        }
                        onMoveDown={() =>
                          dispatch(reorderActivityInDay({ dayIndex, fromIndex: idx, toIndex: idx + 1 }))
                        }
                        onRemove={() => dispatch(removeActivityFromDay({ dayIndex, activityId: id }))}
                        onMoveToDay={(toDayIndex) =>
                          dispatch(moveActivityToDay({ fromDayIndex: dayIndex, toDayIndex, activityId: id }))
                        }
                        dayOptions={dayOptionsFor(dayIndex)}
                      />
                    );
                  })}
                  {day.activityIds.length === 0 && (
                    <p className="text-xs text-charcoal-800/50">None yet.</p>
                  )}
                </div>
                {unassignedActivities.length > 0 && (
                  <select
                    onChange={(e) =>
                      e.target.value && dispatch(addActivityToDay({ dayIndex, activityId: e.target.value }))
                    }
                    value=""
                    className="mt-2 w-full rounded-lg border border-dashed border-backwater-200 px-3 py-2 text-sm text-charcoal-800 outline-none"
                  >
                    <option value="">+ Add an experience</option>
                    {unassignedActivities.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <label className="mt-4 block">
              <span className="mb-1 block text-xs font-medium text-backwater-900">
                Notes for this day
              </span>
              <textarea
                rows={2}
                value={day.notes}
                onChange={(e) => dispatch(updateDayNotes({ dayIndex, notes: e.target.value }))}
                placeholder="Any notes for this day..."
                className="w-full rounded-lg border border-backwater-100 px-3 py-2 text-sm outline-none focus:border-backwater-500"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepReview;