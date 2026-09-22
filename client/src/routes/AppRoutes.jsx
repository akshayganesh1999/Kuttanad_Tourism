import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AdminRoute from './AdminRoute';

import Home from '../pages/Home';
import Properties from '../pages/Properties';
import PropertyDetails from '../pages/PropertyDetails';
import Destinations from '../pages/Destinations';
import DestinationDetails from '../pages/DestinationDetails';
import Activities from '../pages/Activities';
import ActivityDetails from '../pages/ActivityDetails';
import PlanYourTrip from '../pages/PlanYourTrip';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProperties from '../pages/admin/AdminProperties';
import AdminPropertyForm from '../pages/admin/AdminPropertyForm';
import AdminRooms from '../pages/admin/AdminRooms';
import AdminRoomForm from '../pages/admin/AdminRoomForm';
import AdminDestinations from '../pages/admin/AdminDestinations';
import AdminDestinationForm from '../pages/admin/AdminDestinationForm';
import AdminActivities from '../pages/admin/AdminActivities';
import AdminActivityForm from '../pages/admin/AdminActivityForm';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminEnquiries from '../pages/admin/AdminEnquiries';
import AdminItineraries from '../pages/admin/AdminItineraries';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:slug" element={<PropertyDetails />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<DestinationDetails />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:slug" element={<ActivityDetails />} />
        <Route path="/plan-your-trip" element={<PlanYourTrip />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin panel - requires login + admin role (AdminRoute), own layout */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="properties/new" element={<AdminPropertyForm />} />
          <Route path="properties/:id/edit" element={<AdminPropertyForm />} />
          <Route path="rooms" element={<AdminRooms />} />
          <Route path="rooms/new" element={<AdminRoomForm />} />
          <Route path="rooms/:id/edit" element={<AdminRoomForm />} />
          <Route path="destinations" element={<AdminDestinations />} />
          <Route path="destinations/new" element={<AdminDestinationForm />} />
          <Route path="destinations/:id/edit" element={<AdminDestinationForm />} />
          <Route path="activities" element={<AdminActivities />} />
          <Route path="activities/new" element={<AdminActivityForm />} />
          <Route path="activities/:id/edit" element={<AdminActivityForm />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="itineraries" element={<AdminItineraries />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
