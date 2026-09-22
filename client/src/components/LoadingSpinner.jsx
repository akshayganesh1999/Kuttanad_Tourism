const LoadingSpinner = ({ label = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10 text-charcoal-800">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-backwater-200 border-t-backwater-700" />
    <p className="text-sm">{label}</p>
  </div>
);

export default LoadingSpinner;
