import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import EntityForm from '../../components/admin/EntityForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getPropertyBySlug, createProperty, updateProperty } from '../../services/propertyService';

const PROPERTY_TYPES = ['Houseboat', 'Homestay', 'Resort', 'Villa', 'Apartment'];

const FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true, fullWidth: true },
  {
    name: 'propertyType',
    label: 'Property Type',
    type: 'select',
    options: PROPERTY_TYPES.map((t) => ({ value: t, label: t })),
    required: true,
  },
  { name: 'houseboatType', label: 'Houseboat Type (if applicable)', type: 'text' },
  { name: 'thumbnail', label: 'Thumbnail Image URL', type: 'text', required: true, fullWidth: true },
  { name: 'images', label: 'Additional Image URLs (comma-separated)', type: 'tags', fullWidth: true },
  { name: 'shortDescription', label: 'Short Description', type: 'text', fullWidth: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4, required: true, fullWidth: true },
  { name: 'location.address', label: 'Address', type: 'text' },
  { name: 'location.area', label: 'Area', type: 'text', required: true },
  { name: 'location.city', label: 'City', type: 'text', required: true },
  { name: 'location.district', label: 'District', type: 'text' },
  { name: 'location.state', label: 'State', type: 'text' },
  { name: 'location.latitude', label: 'Latitude', type: 'number' },
  { name: 'location.longitude', label: 'Longitude', type: 'number' },
  { name: 'pricePerNight', label: 'Price per Night (₹)', type: 'number' },
  { name: 'pricePerPerson', label: 'Price per Person (₹)', type: 'number' },
  { name: 'guestCapacity', label: 'Guest Capacity', type: 'number', required: true },
  { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
  { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
  { name: 'amenities', label: 'Amenities (comma-separated)', type: 'tags', fullWidth: true },
  { name: 'facilities', label: 'Facilities (comma-separated)', type: 'tags', fullWidth: true },
  { name: 'checkIn', label: 'Check-in Time', type: 'text' },
  { name: 'checkOut', label: 'Check-out Time', type: 'text' },
  { name: 'featured', label: 'Featured', type: 'checkbox' },
  { name: 'available', label: 'Available', type: 'checkbox' },
];

const EMPTY = {
  title: '',
  propertyType: '',
  houseboatType: '',
  thumbnail: '',
  images: [],
  shortDescription: '',
  description: '',
  location: { address: '', area: '', city: '', district: '', state: '', latitude: '', longitude: '' },
  pricePerNight: '',
  pricePerPerson: '',
  guestCapacity: '',
  bedrooms: '',
  bathrooms: '',
  amenities: [],
  facilities: [],
  checkIn: '12:00 PM',
  checkOut: '09:00 AM',
  featured: false,
  available: true,
};

const AdminPropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [initialValues, setInitialValues] = useState(isEdit ? null : EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getPropertyBySlug(id)
      .then((property) => setInitialValues({ ...EMPTY, ...property }))
      .catch((err) => toast.error(err.message));
  }, [id, isEdit]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        pricePerNight: values.pricePerNight === '' ? undefined : Number(values.pricePerNight),
        pricePerPerson: values.pricePerPerson === '' ? undefined : Number(values.pricePerPerson),
        guestCapacity: Number(values.guestCapacity),
        bedrooms: values.bedrooms === '' ? undefined : Number(values.bedrooms),
        bathrooms: values.bathrooms === '' ? undefined : Number(values.bathrooms),
      };

      if (isEdit) {
        await updateProperty(initialValues._id, payload);
        toast.success('Property updated');
      } else {
        await createProperty(payload);
        toast.success('Property created');
      }
      navigate('/admin/properties');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && !initialValues) return <LoadingSpinner label="Loading property..." />;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/admin/properties')}
        className="inline-flex items-center gap-2 text-sm text-backwater-700"
      >
        <ArrowLeft size={16} /> Back to Properties
      </button>
      <h1 className="font-display text-2xl font-semibold text-backwater-900">
        {isEdit ? 'Edit Property' : 'New Property'}
      </h1>
      <div className="rounded-2xl border border-backwater-100 bg-white p-6">
        <EntityForm
          fields={FIELDS}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel={isEdit ? 'Save Changes' : 'Create Property'}
        />
      </div>
    </div>
  );
};

export default AdminPropertyForm;
