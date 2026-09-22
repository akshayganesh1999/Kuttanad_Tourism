import { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import { getMyItineraries } from '../../features/itinerary/itineraryApi';

const AdminItineraries = () => {
  const [state, setState] = useState({ status: 'loading', data: [], message: '' });

  const load = () => {
    setState((s) => ({ ...s, status: 'loading' }));
    getMyItineraries({ all: 'true', limit: 20 })
      .then((res) => setState({ status: 'success', data: res.data, message: '' }))
      .catch((err) => setState({ status: 'error', data: [], message: err.message }));
  };

  useEffect(load, []);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'user', label: 'User', render: (r) => r.user?.name || r.user?.email || '—' },
    { key: 'startDate', label: 'Start', render: (r) => new Date(r.startDate).toLocaleDateString('en-GB') },
    { key: 'numberOfDays', label: 'Days' },
    { key: 'guests', label: 'Guests' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-backwater-900">Itineraries</h1>
      <DataTable columns={columns} rows={state.data} status={state.status} errorMessage={state.message} onRetry={load} />
    </div>
  );
};

export default AdminItineraries;
