const EmptyState = ({ title = 'Nothing here yet', description, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-backwater-200 bg-backwater-50/50 py-12 text-center text-charcoal-800 dark:border-white/15 dark:bg-white/5 dark:text-sand-100">
    {Icon && <Icon size={28} className="text-backwater-300 dark:text-backwater-300/70" />}
    <p className="font-medium">{title}</p>
    {description && <p className="max-w-sm text-sm text-charcoal-800/70 dark:text-sand-100/60">{description}</p>}
  </div>
);

export default EmptyState;
