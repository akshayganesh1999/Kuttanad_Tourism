import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Users, BedDouble, Bath, Clock } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ImageGallery from '../components/ImageGallery';
import Rating from '../components/Rating';
import AmenityList from '../components/AmenityList';
import RoomCard from '../components/RoomCard';
import LocationMap from '../components/LocationMap';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import WhatsAppButton from '../components/WhatsAppButton';
import Button from '../components/Button';
import { getPropertyBySlug, getProperties } from '../services/propertyService';
import { getRoomsByProperty } from '../services/roomService';

const initialState = { status: 'loading', property: null, rooms: [], related: [], message: '' };

const PropertyDetails = () => {
  const { slug } = useParams();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let cancelled = false;
    setState(initialState);

    getPropertyBySlug(slug)
      .then(async (property) => {
        if (cancelled) return;
        const [rooms, relatedRes] = await Promise.all([
          getRoomsByProperty(property._id).catch(() => []),
          getProperties({ type: property.propertyType, limit: 4 }).catch(() => ({ data: [] })),
        ]);
        if (cancelled) return;
        const related = (relatedRes.data || []).filter((p) => p._id !== property._id).slice(0, 3);
        setState({ status: 'success', property, rooms, related, message: '' });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({ status: 'error', property: null, rooms: [], related: [], message: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.status === 'loading') return <LoadingSpinner label="Loading property..." />;

  if (state.status === 'error') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <ErrorState message={state.message || 'Property not found'} />
      </div>
    );
  }

  const { property, rooms, related } = state;

  const whatsappMessage = [
    'Hello Kuttanad Tourism,',
    '',
    'I would like to enquire about:',
    property.title,
    `${property.location?.area}, ${property.location?.city}`,
    '',
    'Please share availability and pricing.',
  ].join('\n');

  return (
    <>
      <Helmet>
        <title>{property.title} | Kuttanad Tourism</title>
        <meta
          name="description"
          content={property.shortDescription || property.description?.slice(0, 150)}
        />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Stays', to: '/properties' },
            { label: property.title },
          ]}
        />

        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-backwater-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-backwater-700">
            {property.propertyType}
          </span>
          {typeof property.rating === 'number' && property.rating > 0 && (
            <Rating value={property.rating} reviewCount={property.reviewCount} />
          )}
        </div>
        <h1 className="font-display text-3xl font-semibold text-backwater-900 sm:text-4xl">
          {property.title}
        </h1>
        <p className="mt-1 text-charcoal-800/80">
          {property.location?.area}, {property.location?.city}, {property.location?.state}
        </p>

        <div className="mt-6">
          <ImageGallery
            images={property.images?.length ? property.images : [property.thumbnail]}
            alt={property.title}
          />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 font-display text-xl font-semibold text-backwater-900">Overview</h2>
              <div className="flex flex-wrap gap-4 text-sm text-charcoal-800">
                <span className="inline-flex items-center gap-1">
                  <Users size={16} /> {property.guestCapacity} Guests
                </span>
                <span className="inline-flex items-center gap-1">
                  <BedDouble size={16} /> {property.bedrooms} Bedrooms
                </span>
                <span className="inline-flex items-center gap-1">
                  <Bath size={16} /> {property.bathrooms} Bathrooms
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={16} /> Check-in {property.checkIn} · Check-out {property.checkOut}
                </span>
              </div>
              <p className="mt-4 text-charcoal-800">{property.description}</p>
            </div>

            <AmenityList title="Amenities" items={property.amenities} />
            <AmenityList title="Facilities" items={property.facilities} />

            {property.propertyType === 'Houseboat' && property.houseboatType && (
              <div>
                <h2 className="mb-2 font-display text-xl font-semibold text-backwater-900">
                  Houseboat Experience
                </h2>
                <p className="text-charcoal-800">
                  {property.houseboatType} — cruise the Kuttanad backwaters with meals and a
                  dedicated crew on board.
                </p>
              </div>
            )}

            {rooms.length > 0 && (
              <div>
                <h2 className="mb-3 font-display text-xl font-semibold text-backwater-900">Rooms</h2>
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                  ))}
                </div>
              </div>
            )}

            {property.location?.latitude && property.location?.longitude && (
              <div>
                <h2 className="mb-3 font-display text-xl font-semibold text-backwater-900">Location</h2>
                <LocationMap
                  latitude={property.location.latitude}
                  longitude={property.location.longitude}
                  label={property.title}
                />
              </div>
            )}
          </div>

          <aside className="h-fit space-y-4 rounded-2xl border border-backwater-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="font-display text-2xl font-semibold text-backwater-900">
              {property.pricePerNight
                ? `₹${property.pricePerNight.toLocaleString('en-IN')}`
                : `₹${property.pricePerPerson?.toLocaleString('en-IN')}`}
              <span className="text-sm font-normal text-charcoal-800/70">
                {' '}
                / {property.pricePerNight ? 'night' : 'person'}
              </span>
            </p>
            <Button as={Link} to="/plan-your-trip" variant="primary" className="w-full">
              Add to Trip Plan
            </Button>
            <WhatsAppButton message={whatsappMessage} label="Book via WhatsApp" className="w-full" />
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-xl font-semibold text-backwater-900">
              Related Properties
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyDetails;
