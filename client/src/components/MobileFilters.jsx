import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

const MobileFilters = ({ filters, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-backwater-100 bg-white px-4 py-2 text-sm font-medium text-backwater-900"
      >
        <SlidersHorizontal size={16} /> Filters
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-lg font-semibold text-backwater-900">Filters</p>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close filters">
                  <X size={22} />
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={onChange} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 w-full rounded-full bg-backwater-700 py-3 text-sm font-semibold text-white"
              >
                Show results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileFilters;
