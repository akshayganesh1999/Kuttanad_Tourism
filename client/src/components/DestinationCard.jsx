import { Link } from 'react-router-dom';

const DestinationCard = ({ destination }) => {
  const { slug, images, name, category, shortDescription } = destination;

  return (
    <Link
      to={`/destinations/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-backwater-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-charcoal-800/60"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={images?.[0]}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-backwater-900 dark:bg-charcoal-900/85 dark:text-gold-400">
          {category}
        </span>
      </div>
      <div className="space-y-1 p-4">
        <h3 className="font-display text-lg font-semibold text-backwater-900 dark:text-sand-50">{name}</h3>
        <p className="line-clamp-2 text-sm text-charcoal-800/80 dark:text-sand-100/70">{shortDescription}</p>
      </div>
    </Link>
  );
};

export default DestinationCard;
