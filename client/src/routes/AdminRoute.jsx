import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { token, user } = useSelector((s) => s.auth);

  if (!token) return <Navigate to="/login" replace />;

  if (user?.role !== 'admin') {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-backwater-900">Access denied</h1>
        <p className="mt-2 text-charcoal-800">This area is for administrators only.</p>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
