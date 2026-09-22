const RoomCard = ({ room }) => {
  const { name, roomType, images, price, capacity, bedType, amenities = [] } = room;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-backwater-100 bg-white shadow-sm sm:flex-row">
      <div className="h-40 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-48">
        <img src={images?.[0]} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-backwater-500">{roomType}</p>
          <h4 className="font-display text-lg font-semibold text-backwater-900">{name}</h4>
          <p className="mt-1 text-sm text-charcoal-800/80">
            {capacity} guests · {bedType} bed
            {amenities.length ? ` · ${amenities.slice(0, 2).join(', ')}` : ''}
          </p>
        </div>
        <p className="mt-3 font-semibold text-backwater-900">₹{price.toLocaleString('en-IN')} / night</p>
      </div>
    </div>
  );
};

export default RoomCard;
