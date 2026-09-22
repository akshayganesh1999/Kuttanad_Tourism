const CategoryChips = ({ options, value, onChange, allLabel = 'All' }) => (
  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      onClick={() => onChange('')}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        !value
          ? 'bg-backwater-700 text-white'
          : 'border border-backwater-100 bg-white text-charcoal-800 hover:bg-backwater-50'
      }`}
    >
      {allLabel}
    </button>
    {options.map((opt) => (
      <button
        type="button"
        key={opt}
        onClick={() => onChange(opt)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          value === opt
            ? 'bg-backwater-700 text-white'
            : 'border border-backwater-100 bg-white text-charcoal-800 hover:bg-backwater-50'
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default CategoryChips;
