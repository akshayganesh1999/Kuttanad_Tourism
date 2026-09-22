import CategoryChips from './CategoryChips';

const PROPERTY_TYPES = ['Houseboat', 'Homestay', 'Resort', 'Villa', 'Apartment'];
const COMMON_AMENITIES = ['Air conditioning', 'Free Wi-Fi', 'Swimming pool', 'Onboard chef', 'Private kitchen'];

const FilterSidebar = ({ filters, onChange }) => {
  const selectedAmenities = filters.amenities ? filters.amenities.split(',').filter(Boolean) : [];

  const toggleAmenity = (amenity) => {
    const next = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    onChange({ amenities: next.join(',') });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-backwater-900">Property Type</p>
        <CategoryChips
          options={PROPERTY_TYPES}
          value={filters.type || ''}
          onChange={(v) => onChange({ type: v })}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-backwater-900">Price per night (₹)</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className="w-full rounded-lg border border-backwater-100 px-3 py-2 text-sm outline-none focus:border-backwater-500"
          />
          <span className="text-charcoal-800/50">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className="w-full rounded-lg border border-backwater-100 px-3 py-2 text-sm outline-none focus:border-backwater-500"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-backwater-900">Guests</p>
        <input
          type="number"
          min="1"
          placeholder="Number of guests"
          value={filters.guests || ''}
          onChange={(e) => onChange({ guests: e.target.value })}
          className="w-full rounded-lg border border-backwater-100 px-3 py-2 text-sm outline-none focus:border-backwater-500"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-backwater-900">Amenities</p>
        <div className="space-y-2">
          {COMMON_AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm text-charcoal-800">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="rounded border-backwater-200 text-backwater-700 focus:ring-backwater-500"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
