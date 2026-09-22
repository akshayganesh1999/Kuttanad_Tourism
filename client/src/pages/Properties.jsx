import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import FilterSidebar from '../components/FilterSidebar';
import MobileFilters from '../components/MobileFilters';
import Pagination from '../components/Pagination';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { getProperties } from '../services/propertyService';

const SORT_OPTIONS = [
  { value: '', label: 'Recommended' },
  { value: 'priceAsc', label: 'Price: Low to High' },
  { value: 'priceDesc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const [retryKey, setRetryKey] = useState(0);

  const [state, setState] = useState({ status: 'loading', data: [], pagination: null, message: '' });

  const filters = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const page = Number(filters.page) || 1;

  const updateFilters = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value === undefined || value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    next.delete('page'); // any filter change resets pagination
    setSearchParams(next);
  };

  const goToPage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', nextPage);
    setSearchParams(next);
  };

  useEffect(() => {
    if (debouncedSearch !== (searchParams.get('search') || '')) {
      updateFilters({ search: debouncedSearch });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, status: 'loading' }));

    getProperties({ ...filters, limit: 12 })
      .then((res) => {
        if (cancelled) return;
        setState({ status: 'success', data: res.data, pagination: res.pagination, message: '' });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ status: 'error', data: [], pagination: null, message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams, retryKey]);

  return (
    <>
      <Helmet>
        <title>Houseboats &amp; Stays in Kuttanad | Kuttanad Tourism</title>
        <meta
          name="description"
          content="Browse houseboats, homestays, resorts, villas and apartments across Kuttanad and Alappuzha, Kerala."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="Stays"
          title="Houseboats & Stays"
          description="Filter by type, price, guest count, and amenities to find your Kuttanad stay."
        />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex flex-1 items-center gap-2 rounded-full border border-backwater-100 bg-white px-4 py-2.5 sm:max-w-sm">
            <Search size={16} className="text-backwater-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search stays..."
              className="w-full text-sm outline-none placeholder:text-charcoal-800/50"
            />
          </label>

          <select
            value={filters.sort || ''}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            className="rounded-full border border-backwater-100 bg-white px-4 py-2.5 text-sm text-charcoal-800 outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <MobileFilters filters={filters} onChange={updateFilters} />

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-backwater-100 bg-white p-5">
              <FilterSidebar filters={filters} onChange={updateFilters} />
            </div>
          </aside>

          <div>
            {state.status === 'loading' && (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {state.status === 'error' && (
              <ErrorState message={state.message} onRetry={() => setRetryKey((k) => k + 1)} />
            )}

            {state.status === 'success' && !state.data.length && (
              <EmptyState
                title="No stays match these filters"
                description="Try widening your price range or clearing a filter."
              />
            )}

            {state.status === 'success' && state.data.length > 0 && (
              <>
                <p className="mb-4 text-sm text-charcoal-800/70">
                  {state.pagination.total} stay{state.pagination.total === 1 ? '' : 's'} found
                </p>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {state.data.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
                <Pagination page={page} pages={state.pagination.pages} onChange={goToPage} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Properties;
