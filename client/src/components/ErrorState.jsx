const ErrorState = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 py-12 text-center dark:border-red-500/20 dark:bg-red-500/10">
    <p className="font-medium text-red-700 dark:text-red-400">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
      >
        Try again
      </button>
    )}
  </div>
);

export default ErrorState;
