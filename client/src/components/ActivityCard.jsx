import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const ActivityCard = ({ activity }) => {
  const { slug, image, name, category, duration, price } = activity;

  return (
    <Link
      to={`/activities/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-backwater-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-charcoal-800/60"
    >
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-backwater-500 dark:text-backwater-300">
          {category}
        </p>
        <h3 className="font-display text-base font-semibold text-backwater-900 dark:text-sand-50">{name}</h3>
        <div className="flex items-center justify-between pt-1 text-sm text-charcoal-800/80 dark:text-sand-100/70">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} /> {duration}
          </span>
          <span className="font-semibold text-backwater-900 dark:text-sand-50">
            {price ? `₹${price.toLocaleString('en-IN')}` : 'Included'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
