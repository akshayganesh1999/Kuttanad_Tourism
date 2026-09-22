import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => (
    <div className="flex min-h-screen flex-col bg-sand-50 dark:bg-charcoal-900">
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
    <Navbar />
    <main id="main-content" className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
