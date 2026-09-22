import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDestination } from '../itinerarySlice';
import SelectableCard from '../../../components/SelectableCard';
import SkeletonCard from '../../../components/SkeletonCard';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import CategoryChips from '../../../components/CategoryChips';
import { getDestinations } from '../../../services/destinationService';

const CATEGORIES = ['Beach', 'Backwaters', 'Village', 'Island', 'Culture', 'Nature'];

const StepDestinations = () => {
  const dispatch = useDispatch();
  const selected = useSelector((s) => s.itinerary.destinations);
  const [category, setCategory] = useState('');
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', data: [], message: '' });

    getDestinations({ category: category || undefined, limit: 12 })
      .then((res) => {
        if (!cancelled) setState({ status: 'success', data: res.data, message: '' });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: 'error', data: [], message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  const isSelected = (id) => selected.some((d) => d._id === id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-backwater-900">Choose Destinations</h2>
        <p className="mt-1 text-sm text-charcoal-800/80">
          Select as many places as you&apos;d like to visit.
        </p>
      </div>

      <CategoryChips options={CATEGORIES} value={category} onChange={setCategory} />

      {state.status === 'loading' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {state.status === 'error' && <ErrorState message={state.message} />}

      {state.status === 'success' && !state.data.length && (
        <EmptyState title="No destinations in this category" />
      )}

      {state.status === 'success' && state.data.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.data.map((destination) => (
            <SelectableCard
              key={destination._id}
              image={destination.images?.[0]}
              title={destination.name}
              subtitle={destination.shortDescription}
              badge={destination.category}
              selected={isSelected(destination._id)}
              onToggle={() => dispatch(toggleDestination(destination))}
            />
          ))}
        </div>
      )}

      <p className="text-sm text-charcoal-800/70">
        {selected.length} destination{selected.length === 1 ? '' : 's'} selected
      </p>
    </div>
  );
};

export default StepDestinations;
