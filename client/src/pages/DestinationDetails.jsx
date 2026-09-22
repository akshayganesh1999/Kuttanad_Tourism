import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, CalendarDays } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ActivityCard from '../components/ActivityCard';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { getDestinationBySlug } from '../services/destinationService';
import { getProperties } from '../services/propertyService';

const initialState = { status: 'loading', destination: null, relatedStays: [], message: '' };

const DestinationDetails = () => {
  const { slug } = useParams();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let cancelled = false;
    setState(initialState);

    getDestinationBySlug(slug)
      .then(async (destination) => {
        if (cancelled) return;
        const relatedStays = await getProperties({ location: destination.location?.area, limit: 3 })
          .then((res) => res.data)
          .catch(() => []);
        if (cancelled) return;
        setState({ status: 'success', destination, relatedStays, message: '' });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({ status: 'error', destination: null, relatedStays: [], message: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.status === 'loading') return <LoadingSpinner label="Loading destination..." />;

  if (state.status === 'error') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <ErrorState message={state.message || 'Destination not found'} />
      </div>
    );
  }

  const { destination, relatedStays } = state;

  return (
    <>
      <Helmet>
        <title>{destination.name} | Kuttanad Tourism</title>
        <meta
          name="description"
          content={destination.shortDescription || destination.description?.slice(0, 150)}
        />
      </Helmet>

      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <img src={destination.images?.[0]} alt={destination.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <span className="mb-2 inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-backwater-900">
            {destination.category}
          </span>
          <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            {destination.name}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Destinations', to: '/destinations' },
            { label: destination.name },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-8">
            <p className="text-charcoal-800">{destination.description}</p>

            {destination.thingsToDo?.length > 0 && (
              <div>
                <h2 className="mb-3 font-display text-xl font-semibold text-backwater-900">
                  Things To Do
                </h2>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {destination.thingsToDo.map((item) => (
                    <li key={item} className="rounded-lg bg-backwater-50 px-3 py-2 text-sm text-charcoal-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {destination.activities?.length > 0 && (
              <div>
                <h2 className="mb-3 font-display text-xl font-semibold text-backwater-900">
                  Related Activities
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {destination.activities.map((a) => (
                    <ActivityCard key={a._id} activity={a} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit space-y-4 rounded-2xl border border-backwater-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-charcoal-800">
              <Clock size={16} className="text-backwater-600" /> Recommended:{' '}
              {destination.recommendedDuration}
            </div>
            <div className="flex items-center gap-2 text-sm text-charcoal-800">
              <CalendarDays size={16} className="text-backwater-600" /> Best time:{' '}
              {destination.bestTimeToVisit}
            </div>
          </aside>
        </div>

        {relatedStays.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-xl font-semibold text-backwater-900">
              Related Stays
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedStays.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DestinationDetails;
