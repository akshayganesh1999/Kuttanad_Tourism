import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DataTable from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import { getUsers, updateUserRole, deleteUser } from '../../services/userService';

const AdminUsers = () => {
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = () => {
    setState((s) => ({ ...s, status: 'loading' }));
    getUsers({ limit: 20 })
      .then((res) => setState({ status: 'success', data: res.data, message: '' }))
      .catch((err) => setState({ status: 'error', data: [], message: err.message }));
  };

  useEffect(load, []);

  const toggleRole = async (user) => {
    const nextRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      await updateUserRole(user._id, { role: nextRole });
      toast.success(`${user.name} is now ${nextRole === 'admin' ? 'an admin' : 'a regular user'}`);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(pendingDelete._id);
      toast.success('User deleted');
      setPendingDelete(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'role',
      label: 'Role',
      render: (r) => (
        <button
          type="button"
          onClick={() => toggleRole(r)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            r.role === 'admin' ? 'bg-gold-400/20 text-gold-500' : 'bg-backwater-50 text-backwater-700'
          }`}
        >
          {r.role}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-backwater-900">Users</h1>
      <p className="text-sm text-charcoal-800/70">
        Click a role badge to toggle between user and admin.
      </p>

      <DataTable
        columns={columns}
        rows={state.data}
        status={state.status}
        errorMessage={state.message}
        onRetry={load}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete user?"
        description={pendingDelete ? `This will permanently delete "${pendingDelete.name}".` : ''}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default AdminUsers;
