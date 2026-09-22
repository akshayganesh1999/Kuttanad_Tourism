import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import EntityForm from '../../components/admin/EntityForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getRoomById, createRoom, updateRoom } from '../../services/roomService';
import { getProperties } from '../../services/propertyService';

const BED_TYPES = ['Single', 'Double', 'Twin', 'Queen', 'King', 'Bunk'];

const EMPTY = {
  property: '',
  name: '',
  roomType: '',
  description: '',
  images: [],
  price: '',
  capacity: '',
  bedType: 'Double',
  amenities: [],
  available: true,
  totalRooms: 1,
};

const AdminRoomForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [initialValues, setInitialValues] = useState(isEdit ? null : EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProperties({ limit: 100 })
      .then((res) => setPropertyOptions(res.data.map((p) => ({ value: p._id, label: p.title }))))
      .catch((err) => toast.error(err.message));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    getRoomById(id)
      .then((room) => setInitialValues({ ...EMPTY, ...room, property: room.property?._id || room.property }))
      .catch((err) => toast.error(err.message));
  }, [id, isEdit]);

  const fields = [
    {
      name: 'property',
      label: 'Property',
      type: 'select',
      options: propertyOptions,
      required: true,
      fullWidth: true,
    },
    { name: 'name', label: 'Room Name', type: 'text', required: true },
    { name: 'roomType', label: 'Room Type', type: 'text', required: true, placeholder: 'e.g. Deluxe AC Room' },
    { name: 'price', label: 'Price per Night (₹)', type: 'number', required: true },
    { name: 'capacity', label: 'Guest Capacity', type: 'number', required: true },
    { name: 'bedType', label: 'Bed Type', type: 'select', options: BED_TYPES.map((b) => ({ value: b, label: b })) },
    { name: 'totalRooms', label: 'Total Rooms of This Type', type: 'number' },
    { name: 'images', label: 'Image URLs (comma-separated)', type: 'tags', fullWidth: true },
    { name: 'amenities', label: 'Amenities (comma-separated)', type: 'tags', fullWidth: true },
    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { name: 'available', label: 'Available', type: 'checkbox' },
  ];

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        capacity: Number(values.capacity),
        totalRooms: values.totalRooms === '' ? undefined : Number(values.totalRooms),
      };

      if (isEdit) {
        await updateRoom(initialValues._id, payload);
        toast.success('Room updated');
      } else {
        await createRoom(payload);
        toast.success('Room created');
      }
      navigate('/admin/rooms');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && !initialValues) return <LoadingSpinner label="Loading room..." />;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/admin/rooms')}
        className="inline-flex items-center gap-2 text-sm text-backwater-700"
      >
        <ArrowLeft size={16} /> Back to Rooms
      </button>
      <h1 className="font-display text-2xl font-semibold text-backwater-900">
        {isEdit ? 'Edit Room' : 'New Room'}
      </h1>
      <div className="rounded-2xl border border-backwater-100 bg-white p-6">
        <EntityForm
          fields={fields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel={isEdit ? 'Save Changes' : 'Create Room'}
        />
      </div>
    </div>
  );
};

export default AdminRoomForm;
