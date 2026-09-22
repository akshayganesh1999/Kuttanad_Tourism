import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import ContactDetailsForm from './ContactDetailsForm';
import Button from '../../components/Button';
import { createEnquiry } from '../../services/enquiryService';
import { createItinerary } from './itineraryApi';
import { buildTripWhatsAppMessage } from './whatsappMessageBuilder';
import { buildWhatsAppLink } from '../../utils/whatsapp';
import { resetItinerary } from './itinerarySlice';
import { AUTH_TOKEN_KEY } from '../auth/authSlice';

const validateContact = (contact) => {
  const errors = {};
  if (!contact.customerName || contact.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name.';
  }
  if (!contact.phone || !/^[+]?[\d\s-]{7,15}$/.test(contact.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  return errors;
};

const SubmitTripCTA = ({ onSuccess, onPlanAnother }) => {
  const dispatch = useDispatch();
  const itinerary = useSelector((s) => s.itinerary);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [waLink, setWaLink] = useState('');

  const handleSubmit = async () => {
    const validationErrors = validateContact(itinerary.contactDetails);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    setErrorMessage('');

    const waWindow = window.open('', '_blank');

    const message = buildTripWhatsAppMessage(itinerary, itinerary.contactDetails);

    let itineraryId;
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      try {
        const saved = await createItinerary({
          title: 'Kuttanad Trip',
          startDate: itinerary.travelDetails.startDate,
          endDate: itinerary.travelDetails.endDate,
          guests: itinerary.travelDetails.guests,
          accommodation: itinerary.accommodation || undefined,
          houseboat: itinerary.houseboat?._id,
          destinations: itinerary.destinations.map((d) => d._id),
          activities: itinerary.activities.map((a) => a._id),
          days: itinerary.days.map((d) => ({
            dayNumber: d.dayNumber,
            title: d.title,
            notes: d.notes,
            destinations: d.destinationIds,
            activities: d.activityIds,
          })),
          specialRequirements: itinerary.specialRequirements || undefined,
          status: 'Submitted',
        });
        itineraryId = saved?._id;
      } catch (err) {
        console.warn('Could not save itinerary record:', err.message);
      }
    }

    try {
      await createEnquiry({
        customerName: itinerary.contactDetails.customerName,
        phone: itinerary.contactDetails.phone,
        email: itinerary.contactDetails.email || undefined,
        travelStartDate: itinerary.travelDetails.startDate,
        travelEndDate: itinerary.travelDetails.endDate,
        numberOfDays: itinerary.travelDetails.numberOfDays,
        numberOfGuests: itinerary.travelDetails.guests,
        property: itinerary.houseboat?._id,
        houseboat: itinerary.houseboat?._id,
        destinations: itinerary.destinations.map((d) => d._id),
        activities: itinerary.activities.map((a) => a._id),
        itinerary: itineraryId,
        foodPreferences: itinerary.preferences.foodPreference || undefined,
        specialRequirements: itinerary.specialRequirements || undefined,
        message,
        source: 'Website',
      });

      const link = buildWhatsAppLink(message);
      setWaLink(link);
      setStatus('success');
      onSuccess?.();
      dispatch(resetItinerary());

      if (waWindow) {
        waWindow.location.href = link;
      } else {
        window.location.href = link;
      }
    } catch (err) {
      if (waWindow) waWindow.close();
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-backwater-100 bg-backwater-50 p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 text-backwater-700" size={32} />
        <h3 className="font-display text-lg font-semibold text-backwater-900">Enquiry sent!</h3>
        <p className="mt-1 text-sm text-charcoal-800/80">
          We&apos;ve saved your trip details. If WhatsApp didn&apos;t open automatically, tap below.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          <MessageCircle size={18} /> Open WhatsApp
        </a>
        <div className="mt-4">
          <button
            type="button"
            onClick={onPlanAnother}
            className="text-sm font-medium text-backwater-700 hover:underline"
          >
            Plan another trip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-backwater-100 bg-white p-5">
      <ContactDetailsForm errors={errors} />

      {status === 'error' && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button
        type="button"
        variant="primary"
        onClick={handleSubmit}
        disabled={status === 'submitting'}
        className="w-full"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit & Book via WhatsApp'}
      </Button>
      <p className="text-center text-xs text-charcoal-800/60">
        We&apos;ll save your trip details and open WhatsApp with everything filled in.
      </p>
    </div>
  );
};

export default SubmitTripCTA;