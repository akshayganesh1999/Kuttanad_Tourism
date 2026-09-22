import { useEffect, useState } from 'react';
import { Users, Home, MapPin, Compass, Inbox, Clock, CheckCircle } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import SimpleBarChart from '../../components/admin/SimpleBarChart';
import DataTable from '../../components/admin/DataTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';
import { getProperties } from '../../services/propertyService';
import { getDestinations } from '../../services/destinationService';
import { getActivities } from '../../services/activityService';
import { getUsers } from '../../services/userService';
import { listEnquiries } from '../../services/enquiryService';

const PROPERTY_TYPES = ['Houseboat', 'Homestay', 'Resort', 'Villa', 'Apartment'];
const DESTINATION_CATEGORIES = ['Beach', 'Backwaters', 'Village', 'Island', 'Culture', 'Nature'];

const initialStats = {
  users: 0,
  properties: 0,
  destinations: 0,
  activities: 0,
  enquiries: 0,
  pending: 0,
  confirmed: 0,
};

const AdminDashboard = () => {
  const [status, setStatus] = useState('loading');
  const [stats, setStats] = useState(initialStats);
  const [propertyBreakdown, setPropertyBreakdown] = useState([]);
  const [destinationBreakdown, setDestinationBreakdown] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus('loading');
      try {
        const [
          usersRes,
          propertiesRes,
          destinationsRes,
          activitiesRes,
          enquiriesRes,
          pendingRes,
          confirmedRes,
          recentRes,
          ...propertyTypeCounts
        ] = await Promise.all([
          getUsers({ limit: 1 }),
          getProperties({ limit: 1 }),
          getDestinations({ limit: 1 }),
          getActivities({ limit: 1 }),
          listEnquiries({ limit: 1 }),
          listEnquiries({ status: 'Pending', limit: 1 }),
          listEnquiries({ status: 'Confirmed', limit: 1 }),
          listEnquiries({ limit: 5 }),
          ...PROPERTY_TYPES.map((type) => getProperties({ type, limit: 1 })),
        ]);

        const destinationCategoryCounts = await Promise.all(
          DESTINATION_CATEGORIES.map((category) => getDestinations({ category, limit: 1 }))
        );

        if (cancelled) return;

        setStats({
          users: usersRes.pagination?.total || 0,
          properties: propertiesRes.pagination?.total || 0,
          destinations: destinationsRes.pagination?.total || 0,
          activities: activitiesRes.pagination?.total || 0,
          enquiries: enquiriesRes.pagination?.total || 0,
          pending: pendingRes.pagination?.total || 0,
          confirmed: confirmedRes.pagination?.total || 0,
        });
        setPropertyBreakdown(
          PROPERTY_TYPES.map((type, i) => ({ label: type, value: propertyTypeCounts[i].pagination?.total || 0 }))
        );
        setDestinationBreakdown(
          DESTINATION_CATEGORIES.map((category, i) => ({
            label: category,
            value: destinationCategoryCounts[i].pagination?.total || 0,
          }))
        );
        setRecentEnquiries(recentRes.data || []);
        setStatus('success');
      } catch (err) {
        if (!cancelled) setStatus('error');
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') return <LoadingSpinner label="Loading dashboard..." />;
  if (status === 'error') return <ErrorState message="Could not load dashboard data." />;

  const enquiryColumns = [
    { key: 'customerName', label: 'Customer' },
    { key: 'phone', label: 'Phone' },
    { key: 'numberOfGuests', label: 'Guests' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-semibold text-backwater-900">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={stats.users} icon={Users} />
        <StatCard label="Total Properties" value={stats.properties} icon={Home} />
        <StatCard label="Total Destinations" value={stats.destinations} icon={MapPin} />
        <StatCard label="Total Activities" value={stats.activities} icon={Compass} />
        <StatCard label="Total Enquiries" value={stats.enquiries} icon={Inbox} />
        <StatCard label="Pending Enquiries" value={stats.pending} icon={Clock} accent="text-gold-500" />
        <StatCard label="Confirmed Enquiries" value={stats.confirmed} icon={CheckCircle} accent="text-backwater-700" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleBarChart title="Properties by Type" data={propertyBreakdown} />
        <SimpleBarChart title="Destinations by Category" data={destinationBreakdown} />
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold text-backwater-900">Recent Enquiries</h2>
        <DataTable columns={enquiryColumns} rows={recentEnquiries} status="success" />
      </div>
    </div>
  );
};

export default AdminDashboard;
