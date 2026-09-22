import { useDispatch, useSelector } from 'react-redux';
import { setContactDetails } from './itinerarySlice';

const ContactDetailsForm = ({ errors = {} }) => {
  const dispatch = useDispatch();
  const contactDetails = useSelector((s) => s.itinerary.contactDetails);

  const set = (field, value) => dispatch(setContactDetails({ [field]: value }));

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-backwater-900">Your Details</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-backwater-900">Full Name *</span>
          <input
            type="text"
            value={contactDetails.customerName}
            onChange={(e) => set('customerName', e.target.value)}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-backwater-500 ${
              errors.customerName ? 'border-red-400' : 'border-backwater-100'
            }`}
          />
          {errors.customerName && <p className="mt-1 text-xs text-red-600">{errors.customerName}</p>}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-backwater-900">Phone Number *</span>
          <input
            type="tel"
            value={contactDetails.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-backwater-500 ${
              errors.phone ? 'border-red-400' : 'border-backwater-100'
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-backwater-900">Email (optional)</span>
        <input
          type="email"
          value={contactDetails.email}
          onChange={(e) => set('email', e.target.value)}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-backwater-500 ${
            errors.email ? 'border-red-400' : 'border-backwater-100'
          }`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </label>
    </div>
  );
};

export default ContactDetailsForm;
