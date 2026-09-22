import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const DEFAULT_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    alt: 'Houseboat cruising the Kuttanad backwaters',
  },
  {
    src: 'https://cdn.siasat.com/wp-content/uploads/2025/12/Siasat-12.jpg',
    alt: 'Kuttanad paddy fields farmed below sea level',
  },
  {
    src: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e',
    alt: 'Sunset over Vembanad Lake',
  },
];

const HeroCarousel = ({ images = DEFAULT_IMAGES, interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || images.length <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, shouldReduceMotion]);

  const current = images[shouldReduceMotion ? 0 : index];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shouldReduceMotion ? (
        <img src={current.src} alt={current.alt} className="absolute inset-0 h-full w-full object-cover opacity-40" />
      ) : (
        <AnimatePresence>
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === (shouldReduceMotion ? 0 : index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === (shouldReduceMotion ? 0 : index) ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
