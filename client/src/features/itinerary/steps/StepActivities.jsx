import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActivity } from '../itinerarySlice';
import SelectableCard from '../../../components/SelectableCard';
import SkeletonCard from '../../../components/SkeletonCard';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import CategoryChips from '../../../components/CategoryChips';
import { getActivities } from '../../../services/activityService';

const CATEGORIES = [
  'Water Activity',
  'Cultural',
  'Adventure',
  'Food & Cuisine',
  'Nature',
  'Leisure',
  'Photography',
];

const StepActivities = () => {
  const dispatch = useDispatch();
  const selected = useSelector((s) => s.itinerary.activities);
  const [category, setCategory] = useState('');
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', data: [], message: '' });

    getActivities({ category: category || undefined, limit: 12 })
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

  const isSelected = (id) => selected.some((a) => a._id === id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-backwater-900">Choose Experiences</h2>
        <p className="mt-1 text-sm text-charcoal-800/80">
          Add the activities you want in your itinerary.
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
        <EmptyState title="No experiences in this category" />
      )}

      {state.status === 'success' && state.data.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.data.map((activity) => (
            <SelectableCard
              key={activity._id}
              image={activity.image}
              title={activity.name}
              subtitle={activity.duration}
              meta={activity.price ? `₹${activity.price.toLocaleString('en-IN')}` : 'Included'}
              badge={activity.category}
              selected={isSelected(activity._id)}
              onToggle={() => dispatch(toggleActivity(activity))}
            />
          ))}
        </div>
      )}

      <p className="text-sm text-charcoal-800/70">
        {selected.length} experience{selected.length === 1 ? '' : 's'} selected
      </p>
    </div>
  );
};

export default StepActivities;
