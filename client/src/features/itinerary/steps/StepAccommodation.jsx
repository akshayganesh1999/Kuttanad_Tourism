import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccommodationType, selectHouseboat } from '../itinerarySlice';
import SelectableCard from '../../../components/SelectableCard';
import SkeletonCard from '../../../components/SkeletonCard';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import CategoryChips from '../../../components/CategoryChips';
import { getProperties } from '../../../services/propertyService';

const TYPES = ['Houseboat', 'Homestay', 'Resort', 'Villa', 'Apartment'];

const StepAccommodation = () => {
  const dispatch = useDispatch();
  const { accommodation, houseboat, travelDetails } = useSelector((s) => s.itinerary);
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', data: [], message: '' });

    getProperties({
      type: accommodation || undefined,
      guests: travelDetails.guests || undefined,
      limit: 9,
    })
      .then((res) => {
        if (!cancelled) setState({ status: 'success', data: res.data, message: '' });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: 'error', data: [], message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [accommodation, travelDetails.guests]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-backwater-900">Choose Your Stay</h2>
        <p className="mt-1 text-sm text-charcoal-800/80">
          Pick a houseboat, homestay, resort, villa, or apartment.
        </p>
      </div>

      <CategoryChips
        options={TYPES}
        value={accommodation}
        onChange={(v) => dispatch(setAccommodationType(v))}
        allLabel="Any type"
      />

      {state.status === 'loading' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {state.status === 'error' && <ErrorState message={state.message} />}

      {state.status === 'success' && !state.data.length && (
        <EmptyState title="No stays match this filter" />
      )}

      {state.status === 'success' && state.data.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.data.map((property) => (
            <SelectableCard
              key={property._id}
              image={property.thumbnail}
              title={property.title}
              subtitle={`${property.location?.area}, ${property.location?.city}`}
              meta={
                property.pricePerNight
                  ? `₹${property.pricePerNight.toLocaleString('en-IN')} / night`
                  : 'Price on request'
              }
              badge={property.propertyType}
              selected={houseboat?._id === property._id}
              onToggle={() =>
                dispatch(selectHouseboat(houseboat?._id === property._id ? null : property))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StepAccommodation;
