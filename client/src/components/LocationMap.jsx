const LocationMap = ({ latitude, longitude, label }) => {
  if (!latitude || !longitude) return null;

  const src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=13&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl border border-backwater-100">
      <iframe
        title={label || 'Location map'}
        src={src}
        className="h-64 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default LocationMap;
