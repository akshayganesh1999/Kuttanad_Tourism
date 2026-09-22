import { useDispatch, useSelector } from 'react-redux';
import { setTravelDetails } from '../itinerarySlice';

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const StepTravelDetails = () => {
  const dispatch = useDispatch();
  const travelDetails = useSelector((s) => s.itinerary.travelDetails);

  const handleChange = (field, value) => {
    dispatch(setTravelDetails({ [field]: value }));
  };

  const datesInvalid =
    travelDetails.startDate &&
    travelDetails.endDate &&
    new Date(travelDetails.endDate) < new Date(travelDetails.startDate);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-backwater-900">Travel Details</h2>
        <p className="mt-1 text-sm text-charcoal-800/80">
          When are you travelling, and how many of you?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-backwater-900">Start Date</span>
          <input
            type="date"
            value={travelDetails.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="w-full rounded-lg border border-backwater-100 px-3 py-2.5 text-sm outline-none focus:border-backwater-500"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-backwater-900">End Date</span>
          <input
            type="date"
            value={travelDetails.endDate || ''}
            min={travelDetails.startDate || undefined}
            onChange={(e) => handleChange('endDate', e.target.value)}
            className="w-full rounded-lg border border-backwater-100 px-3 py-2.5 text-sm outline-none focus:border-backwater-500"
          />
        </label>
      </div>

      {datesInvalid && (
        <p className="text-sm text-red-600">End date cannot be before the start date.</p>
      )}

      <label className="block max-w-xs">
        <span className="mb-1 block text-sm font-medium text-backwater-900">Number of Guests</span>
        <select
          value={travelDetails.guests || 2}
          onChange={(e) => handleChange('guests', Number(e.target.value))}
          className="w-full rounded-lg border border-backwater-100 px-3 py-2.5 text-sm outline-none focus:border-backwater-500"
        >
          {GUEST_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g} guest{g > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </label>

      {travelDetails.numberOfDays > 0 && !datesInvalid && (
        <p className="text-sm text-charcoal-800/80">
          That&apos;s a <strong>{travelDetails.numberOfDays}-day</strong> trip.
        </p>
      )}
    </div>
  );
};

export default StepTravelDetails;
