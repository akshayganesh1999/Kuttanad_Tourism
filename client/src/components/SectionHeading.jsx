const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => (
  <div className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow && (
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold-500 dark:text-gold-400">
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-2xl font-semibold text-backwater-900 dark:text-sand-50 sm:text-3xl">
      {title}
    </h2>
    {description && <p className="mt-3 text-charcoal-800/90 dark:text-sand-100/80">{description}</p>}
  </div>
);

export default SectionHeading;
