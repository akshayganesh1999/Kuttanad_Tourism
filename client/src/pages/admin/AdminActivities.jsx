import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import DataTable from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import Button from '../../components/Button';
import { getActivities, deleteActivity } from '../../services/activityService';

const COLUMNS = [
  { key: 'image', label: '', render: (r) => <img src={r.image} alt="" className="h-10 w-14 rounded object-cover" /> },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'duration', label: 'Duration' },
  { key: 'price', label: 'Price', render: (r) => (r.price ? `₹${r.price.toLocaleString('en-IN')}` : 'Included') },
  { key: 'featured', label: 'Featured', render: (r) => (r.featured ? 'Yes' : 'No') },
];

const AdminActivities = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = () => {
    setState((s) => ({ ...s, status: 'loading' }));
    getActivities({ limit: 20 })
      .then((res) => setState({ status: 'success', data: res.data, message: '' }))
      .catch((err) => setState({ status: 'error', data: [], message: err.message }));
  };

  useEffect(load, []);

  const handleDelete = async () => {
    try {
      await deleteActivity(pendingDelete._id);
      toast.success('Activity deleted');
      setPendingDelete(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-backwater-900">Activities</h1>
        <Button as={Link} to="/admin/activities/new" variant="primary">
          <Plus size={16} /> New Activity
        </Button>
      </div>

      <DataTable
        columns={COLUMNS}
        rows={state.data}
        status={state.status}
        errorMessage={state.message}
        onRetry={load}
        onEdit={(row) => navigate(`/admin/activities/${row._id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete activity?"
        description={pendingDelete ? `This will permanently delete "${pendingDelete.name}".` : ''}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default AdminActivities;
