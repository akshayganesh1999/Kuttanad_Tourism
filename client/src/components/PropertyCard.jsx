import { Link } from 'react-router-dom';
import { Users, BedDouble, Snowflake } from 'lucide-react';
import Rating from './Rating';

const formatPrice = (property) => {
  if (property.pricePerNight) {
    return `₹${property.pricePerNight.toLocaleString('en-IN')} / night`;
  }
  if (property.pricePerPerson) {
    return `₹${property.pricePerPerson.toLocaleString('en-IN')} / person`;
  }
  return 'Price on request';
};

const PropertyCard = ({ property }) => {
  const {
    slug,
    thumbnail,
    propertyType,
    location,
    title,
    rating,
    reviewCount,
    guestCapacity,
    bedrooms,
    amenities = [],
  } = property;

  return (
    <Link
      to={`/properties/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-backwater-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-charcoal-800/60"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-backwater-900 dark:bg-charcoal-900/85 dark:text-gold-400">
          {propertyType}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-backwater-500 dark:text-backwater-300">
          {location?.area}
          {location?.city ? `, ${location.city}` : ''}
        </p>
        <h3 className="line-clamp-1 font-display text-lg font-semibold text-backwater-900 dark:text-sand-50">
          {title}
        </h3>
        {typeof rating === 'number' && rating > 0 && <Rating value={rating} reviewCount={reviewCount} />}
        <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-800/80 dark:text-sand-100/70">
          <span className="inline-flex items-center gap-1">
            <Users size={14} /> {guestCapacity} Guests
          </span>
          {bedrooms ? (
            <span className="inline-flex items-center gap-1">
              <BedDouble size={14} /> {bedrooms} Bed{bedrooms > 1 ? 's' : ''}
            </span>
          ) : null}
          {amenities.includes('Air conditioning') && (
            <span className="inline-flex items-center gap-1">
              <Snowflake size={14} /> AC
            </span>
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-backwater-900 dark:text-sand-50">{formatPrice(property)}</span>
          <span className="text-sm font-medium text-backwater-700 group-hover:underline dark:text-gold-400">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
