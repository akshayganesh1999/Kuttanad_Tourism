import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import EntityForm from '../../components/admin/EntityForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getDestinationBySlug, createDestination, updateDestination } from '../../services/destinationService';
import { getActivities } from '../../services/activityService';

const CATEGORIES = ['Beach', 'Backwaters', 'Village', 'Island', 'Culture', 'Nature'];

const EMPTY = {
  name: '',
  category: '',
  images: [],
  shortDescription: '',
  description: '',
  location: { area: '', district: '', state: '' },
  thingsToDo: [],
  activities: [],
  recommendedDuration: '',
  bestTimeToVisit: '',
  featured: false,
};

const AdminDestinationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [activityOptions, setActivityOptions] = useState([]);
  const [initialValues, setInitialValues] = useState(isEdit ? null : EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getActivities({ limit: 100 })
      .then((res) => setActivityOptions(res.data.map((a) => ({ value: a._id, label: a.name }))))
      .catch((err) => toast.error(err.message));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    getDestinationBySlug(id)
      .then((destination) =>
        setInitialValues({
          ...EMPTY,
          ...destination,
          activities: (destination.activities || []).map((a) => a._id),
        })
      )
      .catch((err) => toast.error(err.message));
  }, [id, isEdit]);

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true, fullWidth: true },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: CATEGORIES.map((c) => ({ value: c, label: c })),
      required: true,
    },
    { name: 'recommendedDuration', label: 'Recommended Duration', type: 'text', placeholder: 'e.g. Half day' },
    { name: 'images', label: 'Image URLs (comma-separated)', type: 'tags', fullWidth: true },
    { name: 'shortDescription', label: 'Short Description', type: 'text', fullWidth: true },
    { name: 'description', label: 'Description', type: 'textarea', rows: 4, required: true, fullWidth: true },
    { name: 'location.area', label: 'Area', type: 'text', required: true },
    { name: 'location.district', label: 'District', type: 'text' },
    { name: 'location.state', label: 'State', type: 'text' },
    { name: 'thingsToDo', label: 'Things To Do (comma-separated)', type: 'tags', fullWidth: true },
    { name: 'activities', label: 'Related Activities', type: 'multiselect', options: activityOptions, fullWidth: true },
    { name: 'bestTimeToVisit', label: 'Best Time to Visit', type: 'text' },
    { name: 'featured', label: 'Featured', type: 'checkbox' },
  ];

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (isEdit) {
        await updateDestination(initialValues._id, values);
        toast.success('Destination updated');
      } else {
        await createDestination(values);
        toast.success('Destination created');
      }
      navigate('/admin/destinations');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && !initialValues) return <LoadingSpinner label="Loading destination..." />;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/admin/destinations')}
        className="inline-flex items-center gap-2 text-sm text-backwater-700"
      >
        <ArrowLeft size={16} /> Back to Destinations
      </button>
      <h1 className="font-display text-2xl font-semibold text-backwater-900">
        {isEdit ? 'Edit Destination' : 'New Destination'}
      </h1>
      <div className="rounded-2xl border border-backwater-100 bg-white p-6">
        <EntityForm
          fields={fields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel={isEdit ? 'Save Changes' : 'Create Destination'}
        />
      </div>
    </div>
  );
};

export default AdminDestinationForm;
