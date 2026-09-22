import { useDispatch, useSelector } from 'react-redux';
import { setPreferences, setSpecialRequirements } from '../itinerarySlice';

const FOOD_OPTIONS = ['No preference', 'Vegetarian', 'Non-vegetarian', 'Vegan'];
const GROUP_OPTIONS = ['Couple', 'Family', 'Group', 'Solo'];
const AC_OPTIONS = ['No preference', 'AC only', 'Non-AC is fine'];
const BUDGET_OPTIONS = ['Budget', 'Mid-range', 'Luxury'];
const TRANSPORT_OPTIONS = ['Not needed', 'Airport pickup', 'Full trip transport'];

const RadioGroup = ({ label, options, value, onChange }) => (
  <div>
    <p className="mb-2 text-sm font-medium text-backwater-900">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          onClick={() => onChange(opt)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            value === opt
              ? 'bg-backwater-700 text-white'
              : 'border border-backwater-100 bg-white text-charcoal-800 hover:bg-backwater-50'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const StepPreferences = () => {
  const dispatch = useDispatch();
  const { preferences, specialRequirements } = useSelector((s) => s.itinerary);

  const set = (field, value) => dispatch(setPreferences({ [field]: value }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold text-backwater-900">Preferences</h2>
        <p className="mt-1 text-sm text-charcoal-800/80">
          Help us tailor the trip to how you like to travel.
        </p>
      </div>

      <RadioGroup
        label="Food Preference"
        options={FOOD_OPTIONS}
        value={preferences.foodPreference}
        onChange={(v) => set('foodPreference', v)}
      />
      <RadioGroup
        label="Travelling As"
        options={GROUP_OPTIONS}
        value={preferences.groupType}
        onChange={(v) => set('groupType', v)}
      />
      <RadioGroup
        label="AC Preference"
        options={AC_OPTIONS}
        value={preferences.acPreference}
        onChange={(v) => set('acPreference', v)}
      />
      <RadioGroup
        label="Budget Preference"
        options={BUDGET_OPTIONS}
        value={preferences.budgetPreference}
        onChange={(v) => set('budgetPreference', v)}
      />
      <RadioGroup
        label="Transportation"
        options={TRANSPORT_OPTIONS}
        value={preferences.transportation}
        onChange={(v) => set('transportation', v)}
      />

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-backwater-900">
          Special Requirements
        </span>
        <textarea
          rows={4}
          value={specialRequirements}
          onChange={(e) => dispatch(setSpecialRequirements(e.target.value))}
          placeholder="Anything else we should know? e.g. celebrating an anniversary, dietary restrictions, accessibility needs..."
          className="w-full rounded-lg border border-backwater-100 px-3 py-2.5 text-sm outline-none focus:border-backwater-500"
        />
      </label>
    </div>
  );
};

export default StepPreferences;
