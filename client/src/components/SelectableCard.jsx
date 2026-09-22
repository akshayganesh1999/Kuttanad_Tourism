import { Check } from 'lucide-react';

const SelectableCard = ({ image, title, subtitle, meta, badge, selected, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`group relative block overflow-hidden rounded-2xl border-2 bg-white text-left shadow-sm transition ${
      selected ? 'border-backwater-700' : 'border-transparent hover:border-backwater-100'
    }`}
  >
    <div className="relative h-36 w-full overflow-hidden">
      <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-backwater-900">
          {badge}
        </span>
      )}
      <span
        className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border-2 transition ${
          selected ? 'border-backwater-700 bg-backwater-700 text-white' : 'border-white bg-white/70 text-transparent'
        }`}
      >
        <Check size={16} />
      </span>
    </div>
    <div className="space-y-1 p-3">
      <h4 className="line-clamp-1 font-display text-base font-semibold text-backwater-900">{title}</h4>
      {subtitle && <p className="line-clamp-1 text-xs text-charcoal-800/70">{subtitle}</p>}
      {meta && <p className="text-sm font-semibold text-backwater-900">{meta}</p>}
    </div>
  </button>
);

export default SelectableCard;
