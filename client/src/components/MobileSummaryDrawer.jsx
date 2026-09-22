import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ClipboardList, X } from 'lucide-react';
import TripSummary from '../features/itinerary/TripSummary';

const MobileSummaryDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-backwater-900 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        <ClipboardList size={16} className="mr-2 inline" /> Trip Summary
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
              className="max-h-[80vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Trip summary"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-lg font-semibold text-backwater-900">Trip Summary</p>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close summary">
                  <X size={22} />
                </button>
              </div>
              <TripSummary />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSummaryDrawer;
