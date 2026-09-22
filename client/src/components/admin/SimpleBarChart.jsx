const SimpleBarChart = ({ title, data = [] }) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="rounded-2xl border border-backwater-100 bg-white p-5 shadow-sm">
      {title && <h3 className="mb-4 font-display text-base font-semibold text-backwater-900">{title}</h3>}

      {data.length === 0 ? (
        <p className="text-sm text-charcoal-800/50">No data yet.</p>
      ) : (
        <div className="space-y-3">
          {data.map((d) => (
            <div key={d.label}>
              <div className="mb-1 flex items-center justify-between text-xs text-charcoal-800/80">
                <span>{d.label}</span>
                <span className="font-semibold">{d.value}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-backwater-50">
                <div
                  className="h-full rounded-full bg-backwater-700"
                  style={{ width: `${(d.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleBarChart;
