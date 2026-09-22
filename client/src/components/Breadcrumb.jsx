import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => (
  <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-charcoal-800/70" aria-label="Breadcrumb">
    {items.map((item, idx) => (
      <span key={item.label} className="flex items-center gap-1">
        {idx > 0 && <ChevronRight size={14} />}
        {item.to ? (
          <Link to={item.to} className="hover:text-backwater-900">
            {item.label}
          </Link>
        ) : (
          <span className="text-backwater-900">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
