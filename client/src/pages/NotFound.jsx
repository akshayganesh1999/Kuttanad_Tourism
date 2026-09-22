import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../components/Button';

const NotFound = () => (
  <>
    <Helmet>
      <title>Page Not Found | Kuttanad Tourism</title>
      {/* A 404 page should never be indexed. */}
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-backwater-900">Page not found</h1>
      <p className="text-charcoal-800">The page you&apos;re looking for doesn&apos;t exist yet.</p>
      <Button as={Link} to="/" variant="primary">
        Back to home
      </Button>
    </div>
  </>
);

export default NotFound;
