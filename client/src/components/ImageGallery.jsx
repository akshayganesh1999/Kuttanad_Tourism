import { useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944';

const ImageGallery = ({ images = [], alt = '' }) => {
  const [active, setActive] = useState(0);
  const gallery = images.length ? images : [FALLBACK_IMAGE];

  return (
    <div>
      <div className="h-64 w-full overflow-hidden rounded-2xl sm:h-96">
        <img src={gallery[active]} alt={alt} className="h-full w-full object-cover" />
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {gallery.map((src, idx) => (
            <button
              type="button"
              key={`${src}-${idx}`}
              onClick={() => setActive(idx)}
              className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                idx === active ? 'border-backwater-700' : 'border-transparent opacity-80'
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
