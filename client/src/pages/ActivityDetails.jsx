import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Gauge, Sun, MapPin } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { getActivityBySlug } from '../services/activityService';

const initialState = { status: 'loading', activity: null, message: '' };

const ActivityDetails = () => {
  const { slug } = useParams();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let cancelled = false;
    setState(initialState);

    getActivityBySlug(slug)
      .then((activity) => {
        if (!cancelled) setState({ status: 'success', activity, message: '' });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: 'error', activity: null, message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.status === 'loading') return <LoadingSpinner label="Loading experience..." />;

  if (state.status === 'error') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <ErrorState message={state.message || 'Activity not found'} />
      </div>
    );
  }

  const { activity } = state;

  return (
    <>
      <Helmet>
        <title>{activity.name} | Kuttanad Tourism</title>
        <meta name="description" content={activity.description?.slice(0, 150)} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Experiences', to: '/activities' },
            { label: activity.name },
          ]}
        />

        <div className="overflow-hidden rounded-2xl">
          <img src={activity.image} alt={activity.name} className="h-64 w-full object-cover sm:h-96" />
        </div>

        <div className="mt-6 space-y-4">
          <span className="inline-block rounded-full bg-backwater-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-backwater-700">
            {activity.category}
          </span>
          <h1 className="font-display text-3xl font-semibold text-backwater-900">{activity.name}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-charcoal-800">
            <span className="inline-flex items-center gap-1">
              <Clock size={16} /> {activity.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <Gauge size={16} /> {activity.difficulty}
            </span>
            <span className="inline-flex items-center gap-1">
              <Sun size={16} /> Best time: {activity.bestTime}
            </span>
            {activity.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={16} /> {activity.location}
              </span>
            )}
          </div>

          <p className="text-charcoal-800">{activity.description}</p>

          <p className="font-display text-2xl font-semibold text-backwater-900">
            {activity.price ? `₹${activity.price.toLocaleString('en-IN')}` : 'Included in itinerary'}
          </p>
        </div>
      </div>
    </>
  );
};

export default ActivityDetails;
