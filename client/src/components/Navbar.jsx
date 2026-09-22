import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Ship, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { toggleMobileMenu, closeMobileMenu } from '../store/slices/uiSlice';
import { logout } from '../features/auth/authSlice';
import { NAV_LINKS } from '../constants/navLinks';
import Button from './Button';
import ThemeToggle from './ThemeToggle';


const NavItem = ({ to, label, onClick }) => (
  <NavLink to={to} onClick={onClick} className="group relative py-1 text-sm font-medium">
    {({ isActive }) => (
      <>
        <span
          className={`transition-colors duration-300 ${
            isActive
              ? 'text-gold-500 dark:text-gold-400'
              : 'text-charcoal-800/80 group-hover:text-gold-500 dark:text-sand-100/80 dark:group-hover:text-gold-400'
          }`}
        >
          {label}
        </span>
        <span
          className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gold-500 transition-all duration-300 dark:bg-gold-400 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </>
    )}
  </NavLink>
);

const Logo = ({ onClick }) => (
  <Link to="/" onClick={onClick} className="group flex items-center gap-3">
    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-backwater-900 text-gold-400 ring-1 ring-gold-400/30 transition group-hover:ring-gold-400/70 dark:bg-white/10">
      <Ship size={18} />
    </span>
    <span className="flex flex-col leading-none">
      <span className="font-display text-xl font-semibold tracking-tight text-backwater-900 dark:text-sand-50">
        Kuttanad
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-500 dark:text-gold-400">
        Tourism
      </span>
    </span>
  </Link>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mobileMenuOpen = useSelector((state) => state.ui.mobileMenuOpen);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeMobileMenu());
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-backwater-100 bg-sand-50/90 backdrop-blur transition-colors dark:border-white/10 dark:bg-charcoal-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Logo onClick={() => dispatch(closeMobileMenu())} />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.label} to={link.to} label={link.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button as={Link} to="/plan-your-trip" variant="primary">
            Plan Your Trip
          </Button>
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'admin' && (
                <Button as={Link} to="/admin" variant="ghost">
                  Admin
                </Button>
              )}
              <span className="text-sm text-charcoal-800/80 dark:text-sand-100/80">
                Hi, {user.name?.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-800/80 transition hover:text-backwater-900 dark:text-sand-100/80 dark:hover:text-gold-400"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Button as={Link} to="/login" variant="ghost">
              Login
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="text-backwater-900 dark:text-sand-50"
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-t border-backwater-100 bg-sand-50 dark:border-white/10 dark:bg-charcoal-900 md:hidden"
          >
            <div className="flex flex-col gap-3 px-4 pb-4 pt-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => dispatch(closeMobileMenu())}
                  className={({ isActive }) =>
                    `py-1 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-gold-500 dark:text-gold-400'
                        : 'text-charcoal-800 dark:text-sand-100/90'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button
                as={Link}
                to="/plan-your-trip"
                variant="primary"
                onClick={() => dispatch(closeMobileMenu())}
              >
                Plan Your Trip
              </Button>

              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Button
                      as={Link}
                      to="/admin"
                      variant="secondary"
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      Admin
                    </Button>
                  )}
                  <p className="px-1 text-sm text-charcoal-800/70 dark:text-sand-100/70">
                    Logged in as {user.name}
                  </p>
                  <Button variant="secondary" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </Button>
                </>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="secondary"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  Login
                </Button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
