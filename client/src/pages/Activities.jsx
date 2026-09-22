import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/SectionHeading';
import ActivityCard from '../components/ActivityCard';
import CategoryChips from '../components/CategoryChips';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { getActivities } from '../services/activityService';

const CATEGORIES = [
  'Water Activity',
  'Cultural',
  'Adventure',
  'Food & Cuisine',
  'Nature',
  'Leisure',
  'Photography',
];
const DIFFICULTY_LEVELS = ['Easy', 'Moderate', 'Challenging'];

const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const difficulty = searchParams.get('difficulty') || '';
  const [retryKey, setRetryKey] = useState(0);
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, status: 'loading' }));

    getActivities({
      category: category || undefined,
      difficulty: difficulty || undefined,
      limit: 20,
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
  }, [category, difficulty, retryKey]);

  return (
    <>
      <Helmet>
        <title>Kerala Backwater Experiences | Kuttanad Tourism</title>
        <meta
          name="description"
          content="Houseboat cruises, canoeing, village walks, cooking classes, and more Kuttanad experiences."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="Things to do"
          title="Experiences"
          description="Add these to your itinerary to make the trip your own."
        />

        <div className="mb-4 space-y-3">
          <CategoryChips options={CATEGORIES} value={category} onChange={(v) => updateParam('category', v)} />
          <CategoryChips
            options={DIFFICULTY_LEVELS}
            value={difficulty}
            onChange={(v) => updateParam('difficulty', v)}
            allLabel="Any difficulty"
          />
        </div>

        {state.status === 'loading' && (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <ErrorState message={state.message} onRetry={() => setRetryKey((k) => k + 1)} />
        )}

        {state.status === 'success' && !state.data.length && (
          <EmptyState title="No experiences found" description="Try a different category or difficulty." />
        )}

        {state.status === 'success' && state.data.length > 0 && (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {state.data.map((a) => (
              <ActivityCard key={a._id} activity={a} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Activities;
