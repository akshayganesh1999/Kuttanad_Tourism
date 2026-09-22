const Pagination = ({ page, pages, onChange }) => {
  if (!pages || pages <= 1) return null;

  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pages || Math.abs(p - page) <= 1
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="rounded-full px-3 py-2 text-sm font-medium text-charcoal-800 transition hover:bg-backwater-50 disabled:opacity-30"
      >
        Prev
      </button>

      {pageNumbers.map((p, idx) => {
        const prev = pageNumbers[idx - 1];
        const showEllipsis = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center">
            {showEllipsis && <span className="px-2 text-charcoal-800/50">…</span>}
            <button
              type="button"
              onClick={() => onChange(p)}
              className={`h-9 w-9 rounded-full text-sm font-medium transition ${
                p === page ? 'bg-backwater-700 text-white' : 'text-charcoal-800 hover:bg-backwater-50'
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="rounded-full px-3 py-2 text-sm font-medium text-charcoal-800 transition hover:bg-backwater-50 disabled:opacity-30"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
