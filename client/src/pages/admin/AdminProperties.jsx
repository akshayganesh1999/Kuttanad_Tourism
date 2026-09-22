import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import DataTable from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import Button from '../../components/Button';
import { getProperties, deleteProperty } from '../../services/propertyService';

const COLUMNS = [
  {
    key: 'thumbnail',
    label: '',
    render: (r) => <img src={r.thumbnail} alt="" className="h-10 w-14 rounded object-cover" />,
  },
  { key: 'title', label: 'Title' },
  { key: 'propertyType', label: 'Type' },
  {
    key: 'price',
    label: 'Price',
    render: (r) =>
      r.pricePerNight
        ? `₹${r.pricePerNight.toLocaleString('en-IN')}`
        : r.pricePerPerson
        ? `₹${r.pricePerPerson.toLocaleString('en-IN')} pp`
        : '—',
  },
  { key: 'guestCapacity', label: 'Guests' },
  { key: 'featured', label: 'Featured', render: (r) => (r.featured ? 'Yes' : 'No') },
];

const AdminProperties = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = () => {
    setState((s) => ({ ...s, status: 'loading' }));
    getProperties({ limit: 20 })
      .then((res) => setState({ status: 'success', data: res.data, message: '' }))
      .catch((err) => setState({ status: 'error', data: [], message: err.message }));
  };

  useEffect(load, []);

  const handleDelete = async () => {
    try {
      await deleteProperty(pendingDelete._id);
      toast.success('Property deleted');
      setPendingDelete(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-backwater-900">Properties</h1>
        <Button as={Link} to="/admin/properties/new" variant="primary">
          <Plus size={16} /> New Property
        </Button>
      </div>

      <DataTable
        columns={COLUMNS}
        rows={state.data}
        status={state.status}
        errorMessage={state.message}
        onRetry={load}
        onEdit={(row) => navigate(`/admin/properties/${row._id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete property?"
        description={pendingDelete ? `This will permanently delete "${pendingDelete.title}".` : ''}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default AdminProperties;
