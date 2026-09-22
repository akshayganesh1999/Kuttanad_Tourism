import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/SectionHeading';
import DestinationCard from '../components/DestinationCard';
import CategoryChips from '../components/CategoryChips';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { getDestinations } from '../services/destinationService';

const CATEGORIES = ['Beach', 'Backwaters', 'Village', 'Island', 'Culture', 'Nature'];

const Destinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [retryKey, setRetryKey] = useState(0);
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, status: 'loading' }));

    getDestinations({ category: category || undefined, limit: 20 })
      .then((res) => {
        if (!cancelled) setState({ status: 'success', data: res.data, message: '' });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: 'error', data: [], message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [category, retryKey]);

  return (
    <>
      <Helmet>
        <title>Kuttanad &amp; Alappuzha Destinations | Kuttanad Tourism</title>
        <meta
          name="description"
          content="Explore backwaters, beaches, villages, and islands across Kuttanad and Alappuzha, Kerala."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="Where to go"
          title="Destinations"
          description="Browse by category to plan the right mix of backwaters, beaches, and village life."
        />

        <div className="mb-8">
          <CategoryChips
            options={CATEGORIES}
            value={category}
            onChange={(v) => setSearchParams(v ? { category: v } : {})}
          />
        </div>

        {state.status === 'loading' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <ErrorState message={state.message} onRetry={() => setRetryKey((k) => k + 1)} />
        )}

        {state.status === 'success' && !state.data.length && (
          <EmptyState title="No destinations found" description="Try a different category." />
        )}

        {state.status === 'success' && state.data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {state.data.map((d) => (
              <DestinationCard key={d._id} destination={d} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Destinations;
