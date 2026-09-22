import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import EntityForm from '../../components/admin/EntityForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getActivityBySlug, createActivity, updateActivity } from '../../services/activityService';

const CATEGORIES = ['Water Activity', 'Cultural', 'Adventure', 'Food & Cuisine', 'Nature', 'Leisure', 'Photography'];
const DIFFICULTY_LEVELS = ['Easy', 'Moderate', 'Challenging'];

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true, fullWidth: true },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: CATEGORIES.map((c) => ({ value: c, label: c })),
    required: true,
  },
  {
    name: 'difficulty',
    label: 'Difficulty',
    type: 'select',
    options: DIFFICULTY_LEVELS.map((d) => ({ value: d, label: d })),
  },
  { name: 'image', label: 'Image URL', type: 'text', required: true, fullWidth: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4, required: true, fullWidth: true },
  { name: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'e.g. 2 hours' },
  { name: 'price', label: 'Price (₹, 0 if included)', type: 'number' },
  { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Kuttanad Backwaters' },
  { name: 'bestTime', label: 'Best Time', type: 'text', placeholder: 'e.g. Morning' },
  { name: 'featured', label: 'Featured', type: 'checkbox' },
];

const EMPTY = {
  name: '',
  category: '',
  difficulty: 'Easy',
  image: '',
  description: '',
  duration: '',
  price: '',
  location: '',
  bestTime: '',
  featured: false,
};

const AdminActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [initialValues, setInitialValues] = useState(isEdit ? null : EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getActivityBySlug(id)
      .then((activity) => setInitialValues({ ...EMPTY, ...activity }))
      .catch((err) => toast.error(err.message));
  }, [id, isEdit]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const payload = { ...values, price: values.price === '' ? 0 : Number(values.price) };
      if (isEdit) {
        await updateActivity(initialValues._id, payload);
        toast.success('Activity updated');
      } else {
        await createActivity(payload);
        toast.success('Activity created');
      }
      navigate('/admin/activities');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && !initialValues) return <LoadingSpinner label="Loading activity..." />;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/admin/activities')}
        className="inline-flex items-center gap-2 text-sm text-backwater-700"
      >
        <ArrowLeft size={16} /> Back to Activities
      </button>
      <h1 className="font-display text-2xl font-semibold text-backwater-900">
        {isEdit ? 'Edit Activity' : 'New Activity'}
      </h1>
      <div className="rounded-2xl border border-backwater-100 bg-white p-6">
        <EntityForm
          fields={FIELDS}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel={isEdit ? 'Save Changes' : 'Create Activity'}
        />
      </div>
    </div>
  );
};

export default AdminActivityForm;
