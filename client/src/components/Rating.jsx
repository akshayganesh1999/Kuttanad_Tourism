import { Star } from 'lucide-react';

const Rating = ({ value = 0, reviewCount, size = 14 }) => (
  <div className="flex items-center gap-1 text-sm text-charcoal-800">
    <Star size={size} className="fill-gold-400 text-gold-400" />
    <span className="font-medium">{Number(value).toFixed(1)}</span>
    {typeof reviewCount === 'number' && (
      <span className="text-charcoal-800/60">({reviewCount})</span>
    )}
  </div>
);

export default Rating;
