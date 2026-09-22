const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-2xl border border-backwater-100 bg-white shadow-sm dark:border-white/10 dark:bg-charcoal-800/60">
    <div className="h-44 w-full bg-backwater-100 dark:bg-white/10" />
    <div className="space-y-2 p-4">
      <div className="h-3 w-1/3 rounded bg-backwater-100 dark:bg-white/10" />
      <div className="h-4 w-2/3 rounded bg-backwater-100 dark:bg-white/10" />
      <div className="h-3 w-1/2 rounded bg-backwater-100 dark:bg-white/10" />
    </div>
  </div>
);

export default SkeletonCard;
