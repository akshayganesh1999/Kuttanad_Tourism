import { Check } from 'lucide-react';

const AmenityList = ({ items = [], title = 'Amenities' }) => {
  if (!items?.length) return null;

  return (
    <div>
      <h3 className="mb-3 font-display text-lg font-semibold text-backwater-900">{title}</h3>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-charcoal-800">
            <Check size={14} className="text-backwater-600" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AmenityList;
