import { useSelector } from 'react-redux';
import { selectEstimatedPrice } from './itinerarySelectors';

const TripSummary = () => {
  const { travelDetails, accommodation, houseboat, destinations, activities } = useSelector(
    (s) => s.itinerary
  );
  const estimatedPrice = useSelector(selectEstimatedPrice);

  return (
    <div className="space-y-4 text-sm">
      <div>
        <p className="font-semibold text-backwater-900">Travel</p>
        <p className="text-charcoal-800/80">
          {travelDetails.startDate && travelDetails.endDate
            ? `${travelDetails.startDate} → ${travelDetails.endDate}`
            : 'Dates not set'}
        </p>
        <p className="text-charcoal-800/80">
          {travelDetails.guests || 0} guests · {travelDetails.numberOfDays || 0} days
        </p>
      </div>

      <div>
        <p className="font-semibold text-backwater-900">Stay</p>
        <p className="text-charcoal-800/80">
          {houseboat ? houseboat.title : accommodation || 'Not selected'}
        </p>
      </div>

      <div>
        <p className="font-semibold text-backwater-900">Destinations ({destinations.length})</p>
        <p className="line-clamp-2 text-charcoal-800/80">
          {destinations.map((d) => d.name).join(', ') || 'None selected'}
        </p>
      </div>

      <div>
        <p className="font-semibold text-backwater-900">Experiences ({activities.length})</p>
        <p className="line-clamp-2 text-charcoal-800/80">
          {activities.map((a) => a.name).join(', ') || 'None selected'}
        </p>
      </div>

      <div className="border-t border-backwater-100 pt-3">
        <p className="font-semibold text-backwater-900">Estimated Price</p>
        <p className="text-lg font-semibold text-backwater-900">
          ₹{estimatedPrice.toLocaleString('en-IN')}
        </p>
        <p className="text-xs text-charcoal-800/60">Final pricing confirmed over WhatsApp.</p>
      </div>
    </div>
  );
};

export default TripSummary;
