import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DataTable from '../../components/admin/DataTable';
import CategoryChips from '../../components/CategoryChips';
import ConfirmDialog from '../../components/ConfirmDialog';
import Modal from '../../components/Modal';
import { listEnquiries, updateEnquiryStatus, deleteEnquiry } from '../../services/enquiryService';

const STATUSES = ['Pending', 'Contacted', 'Confirmed', 'Cancelled', 'Completed'];

const AdminEnquiries = () => {
  const [status, setStatus] = useState('');
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });
  const [pendingDelete, setPendingDelete] = useState(null);
  const [viewing, setViewing] = useState(null);

  const load = () => {
    setState((s) => ({ ...s, status: 'loading' }));
    listEnquiries({ status: status || undefined, limit: 20 })
      .then((res) => setState({ status: 'success', data: res.data, message: '' }))
      .catch((err) => setState({ status: 'error', data: [], message: err.message }));
  };

  useEffect(load, [status]);

  const handleStatusChange = async (enquiry, newStatus) => {
    try {
      await updateEnquiryStatus(enquiry._id, { status: newStatus });
      toast.success('Status updated');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEnquiry(pendingDelete._id);
      toast.success('Enquiry deleted');
      setPendingDelete(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const columns = [
    { key: 'customerName', label: 'Customer' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'travel',
      label: 'Travel',
      render: (r) =>
        `${new Date(r.travelStartDate).toLocaleDateString('en-GB')} - ${new Date(r.travelEndDate).toLocaleDateString('en-GB')}`,
    },
    { key: 'numberOfGuests', label: 'Guests' },
    {
      key: 'status',
      label: 'Status',
      render: (r) => (
        <select
          value={r.status}
          onChange={(e) => handleStatusChange(r, e.target.value)}
          className="rounded-lg border border-backwater-100 bg-white px-2 py-1 text-xs"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: 'view',
      label: '',
      render: (r) => (
        <button type="button" onClick={() => setViewing(r)} className="text-xs font-medium text-backwater-700 hover:underline">
          View
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-backwater-900">Enquiries</h1>
      <CategoryChips options={STATUSES} value={status} onChange={setStatus} allLabel="All" />

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
        title="Delete enquiry?"
        description={pendingDelete ? `This will permanently delete the enquiry from "${pendingDelete.customerName}".` : ''}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <Modal open={Boolean(viewing)} onClose={() => setViewing(null)} title="Enquiry Details" maxWidth="max-w-2xl">
        {viewing && (
          <div className="space-y-2 text-sm text-charcoal-800">
            <p>
              <strong>Customer:</strong> {viewing.customerName} · {viewing.phone}
              {viewing.email ? ` · ${viewing.email}` : ''}
            </p>
            <p>
              <strong>Travel:</strong> {new Date(viewing.travelStartDate).toLocaleDateString('en-GB')} -{' '}
              {new Date(viewing.travelEndDate).toLocaleDateString('en-GB')} ({viewing.numberOfDays} days,{' '}
              {viewing.numberOfGuests} guests)
            </p>
            {viewing.property && (
              <p>
                <strong>Property:</strong> {viewing.property.title}
              </p>
            )}
            {viewing.destinations?.length > 0 && (
              <p>
                <strong>Destinations:</strong> {viewing.destinations.map((d) => d.name).join(', ')}
              </p>
            )}
            {viewing.activities?.length > 0 && (
              <p>
                <strong>Activities:</strong> {viewing.activities.map((a) => a.name).join(', ')}
              </p>
            )}
            {viewing.foodPreferences && (
              <p>
                <strong>Food:</strong> {viewing.foodPreferences}
              </p>
            )}
            {viewing.specialRequirements && (
              <p>
                <strong>Special Requirements:</strong> {viewing.specialRequirements}
              </p>
            )}
            <div>
              <p className="mb-1 font-semibold">Full Message:</p>
              <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg bg-backwater-50 p-3 text-xs">
                {viewing.message}
              </pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminEnquiries;
