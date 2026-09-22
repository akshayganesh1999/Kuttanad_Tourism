import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import DataTable from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import Button from '../../components/Button';
import { getDestinations, deleteDestination } from '../../services/destinationService';

const COLUMNS = [
  {
    key: 'images',
    label: '',
    render: (r) => <img src={r.images?.[0]} alt="" className="h-10 w-14 rounded object-cover" />,
  },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'recommendedDuration', label: 'Duration' },
  { key: 'featured', label: 'Featured', render: (r) => (r.featured ? 'Yes' : 'No') },
];

const AdminDestinations = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = () => {
    setState((s) => ({ ...s, status: 'loading' }));
    getDestinations({ limit: 20 })
      .then((res) => setState({ status: 'success', data: res.data, message: '' }))
      .catch((err) => setState({ status: 'error', data: [], message: err.message }));
  };

  useEffect(load, []);

  const handleDelete = async () => {
    try {
      await deleteDestination(pendingDelete._id);
      toast.success('Destination deleted');
      setPendingDelete(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-backwater-900">Destinations</h1>
        <Button as={Link} to="/admin/destinations/new" variant="primary">
          <Plus size={16} /> New Destination
        </Button>
      </div>

      <DataTable
        columns={COLUMNS}
        rows={state.data}
        status={state.status}
        errorMessage={state.message}
        onRetry={load}
        onEdit={(row) => navigate(`/admin/destinations/${row._id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete destination?"
        description={pendingDelete ? `This will permanently delete "${pendingDelete.name}".` : ''}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default AdminDestinations;
