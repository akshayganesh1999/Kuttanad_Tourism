import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import DataTable from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import Button from '../../components/Button';
import { getRooms, deleteRoom } from '../../services/roomService';

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'roomType', label: 'Type' },
  {
    key: 'property',
    label: 'Property',
    render: (r) => r.property?.title || '—',
  },
  { key: 'price', label: 'Price', render: (r) => `₹${r.price.toLocaleString('en-IN')}` },
  { key: 'capacity', label: 'Capacity' },
  { key: 'available', label: 'Available', render: (r) => (r.available ? 'Yes' : 'No') },
];

const AdminRooms = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = () => {
    setState((s) => ({ ...s, status: 'loading' }));
    getRooms({ limit: 20 })
      .then((res) => setState({ status: 'success', data: res.data, message: '' }))
      .catch((err) => setState({ status: 'error', data: [], message: err.message }));
  };

  useEffect(load, []);

  const handleDelete = async () => {
    try {
      await deleteRoom(pendingDelete._id);
      toast.success('Room deleted');
      setPendingDelete(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-backwater-900">Rooms</h1>
        <Button as={Link} to="/admin/rooms/new" variant="primary">
          <Plus size={16} /> New Room
        </Button>
      </div>

      <DataTable
        columns={COLUMNS}
        rows={state.data}
        status={state.status}
        errorMessage={state.message}
        onRetry={load}
        onEdit={(row) => navigate(`/admin/rooms/${row._id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete room?"
        description={pendingDelete ? `This will permanently delete "${pendingDelete.name}".` : ''}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default AdminRooms;
