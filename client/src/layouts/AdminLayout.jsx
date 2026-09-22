import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  Home,
  BedDouble,
  MapPin,
  Compass,
  Users,
  Inbox,
  NotebookPen,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { logout } from '../features/auth/authSlice';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/properties', label: 'Properties', icon: Home },
  { to: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { to: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { to: '/admin/activities', label: 'Activities', icon: Compass },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/admin/itineraries', label: 'Itineraries', icon: NotebookPen },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive ? 'bg-white/10 text-white' : 'text-backwater-100/80 hover:bg-white/5'
    }`;

  return (
    <div className="flex min-h-screen bg-sand-50">
      <Helmet>
        <title>Admin | Kuttanad Tourism</title>
        {/* Admin pages should never be indexed by search engines. */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <a href="#admin-main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-backwater-100 bg-backwater-900 text-backwater-100 lg:flex lg:flex-col">
        <div className="p-6">
          <p className="font-display text-lg font-semibold text-white">Kuttanad Admin</p>
          <p className="mt-1 truncate text-xs text-backwater-100/60">{user?.name}</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="m-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-backwater-100/80 hover:bg-white/5"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-backwater-100 bg-white p-4 lg:hidden">
          <p className="font-display font-semibold text-backwater-900">Kuttanad Admin</p>
          <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-72 bg-backwater-900 p-6 text-backwater-100"
              >
                <div className="mb-6 flex items-center justify-between">
                  <p className="font-display text-lg font-semibold text-white">Kuttanad Admin</p>
                  <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                    <X size={22} className="text-white" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {NAV.map(({ to, label, icon: Icon, end }) => (
                    <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} className={navLinkClass}>
                      <Icon size={18} /> {label}
                    </NavLink>
                  ))}
                </nav>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-backwater-100/80 hover:bg-white/5"
                >
                  <LogOut size={18} /> Logout
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 bg-black/40"
                onClick={() => setMobileOpen(false)}
              />
            </div>
          )}
        </AnimatePresence>

        <main id="admin-main-content" className="flex-1 overflow-x-hidden p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
