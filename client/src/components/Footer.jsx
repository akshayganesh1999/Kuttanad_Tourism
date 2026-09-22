import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => (
  <footer className="bg-backwater-900 text-backwater-100">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
      <div>
        <p className="font-display text-lg font-semibold text-white">Kuttanad Tourism</p>
        <p className="mt-3 text-sm text-backwater-100/80">
          A premium Kerala backwater trip planner for Kuttanad, Alappuzha and beyond.
        </p>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Explore</p>
        <ul className="space-y-2 text-sm text-backwater-100/80">
          <li>
            <Link to="/properties?type=Houseboat" className="hover:text-white">
              Houseboats
            </Link>
          </li>
          <li>
            <Link to="/properties" className="hover:text-white">
              Stays
            </Link>
          </li>
          <li>
            <Link to="/destinations" className="hover:text-white">
              Destinations
            </Link>
          </li>
          <li>
            <Link to="/activities" className="hover:text-white">
              Experiences
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Plan</p>
        <ul className="space-y-2 text-sm text-backwater-100/80">
          <li>
            <Link to="/plan-your-trip" className="hover:text-white">
              Plan Your Trip
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-white">
              Create account
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Contact</p>
        <ul className="space-y-2 text-sm text-backwater-100/80">
          <li className="flex items-center gap-2">
            <Phone size={14} /> +91 8281234086
          </li>
          <li className="flex items-center gap-2">
            <Mail size={14} /> hello@kuttanadtourism.com
          </li>
        </ul>
        <div className="mt-4 flex gap-3 text-backwater-100/80">
          <Facebook size={18} />
          <Instagram size={18} />
        </div>
      </div>
    </div>

    <div className="border-t border-backwater-700/60 px-4 py-4 text-center text-xs text-backwater-100/60">
      © {new Date().getFullYear()} Kuttanad Tourism
    </div>
  </footer>
);

export default Footer;
