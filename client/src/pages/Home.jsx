import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Compass,
  Heart,
  Sparkles,
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import PropertyCard from '../components/PropertyCard';
import DestinationCard from '../components/DestinationCard';
import ActivityCard from '../components/ActivityCard';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import WhatsAppButton from '../components/WhatsAppButton';
import FadeIn from '../components/FadeIn';
import HeroCarousel from '../components/HeroCarousel';
import { setTravelDetails } from '../features/itinerary/itinerarySlice';
import { getFeaturedProperties } from '../services/propertyService';
import { getFeaturedDestinations } from '../services/destinationService';
import { getFeaturedActivities } from '../services/activityService';

const WHY_CHOOSE_US = [
  {
    icon: ShieldCheck,
    title: 'Verified stays',
    description: 'Every houseboat and homestay is checked before it goes live.',
  },
  {
    icon: Compass,
    title: 'Local expertise',
    description: 'Itineraries built around real Kuttanad village life, not just a checklist.',
  },
  {
    icon: Heart,
    title: 'Human booking',
    description: 'No confusing checkout — just chat with us on WhatsApp and confirm.',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Plan', description: 'Tell us your dates, guests, and what kind of trip you want.' },
  { step: '02', title: 'Customize', description: 'Pick your stay, destinations, and experiences.' },
  { step: '03', title: 'Review', description: 'See your full itinerary laid out day by day.' },
  { step: '04', title: 'WhatsApp', description: 'Send it to us and we confirm availability and pricing.' },
];

const TESTIMONIALS = [
  {
    name: 'Ananya R.',
    location: 'Bengaluru',
    quote: 'The houseboat cruise at sunset was the highlight of our whole Kerala trip.',
  },
  {
    name: 'Daniel K.',
    location: 'London',
    quote: 'Loved how easy it was to put together exactly the days we wanted.',
  },
  {
    name: 'Meera S.',
    location: 'Chennai',
    quote: 'The homestay felt like visiting family, not a hotel.',
  },
];

const initialSectionState = { status: 'loading', data: [], message: '' };

const DataGrid = ({ state, renderItem, onRetry, emptyLabel }) => {
  if (state.status === 'loading') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  if (state.status === 'error') {
    return <ErrorState message={state.message || 'Could not load this section.'} onRetry={onRetry} />;
  }
  if (!state.data.length) {
    return <EmptyState title={emptyLabel} />;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{state.data.map(renderItem)}</div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shouldReduceMotion = useReducedMotion();
  const [searchForm, setSearchForm] = useState({ location: '', startDate: '', endDate: '', guests: '' });
  const [properties, setProperties] = useState(initialSectionState);
  const [destinations, setDestinations] = useState(initialSectionState);
  const [activities, setActivities] = useState(initialSectionState);

  const loadHomeData = () => {
    setProperties(initialSectionState);
    setDestinations(initialSectionState);
    setActivities(initialSectionState);

    getFeaturedProperties(4)
      .then((data) => setProperties({ status: 'success', data, message: '' }))
      .catch((err) => setProperties({ status: 'error', data: [], message: err.message }));

    getFeaturedDestinations(4)
      .then((data) => setDestinations({ status: 'success', data, message: '' }))
      .catch((err) => setDestinations({ status: 'error', data: [], message: err.message }));

    getFeaturedActivities(4)
      .then((data) => setActivities({ status: 'success', data, message: '' }))
      .catch((err) => setActivities({ status: 'error', data: [], message: err.message }));
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const updateSearchField = (field, value) => setSearchForm((f) => ({ ...f, [field]: value }));

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const location = searchForm.location.trim();
    const hasDates = searchForm.startDate && searchForm.endDate;
    const hasGuests = Boolean(searchForm.guests);

    if (hasDates || hasGuests) {
      dispatch(
        setTravelDetails({
          ...(hasDates && { startDate: searchForm.startDate, endDate: searchForm.endDate }),
          ...(hasGuests && { guests: Number(searchForm.guests) }),
        })
      );
      navigate('/plan-your-trip');
      return;
    }

    if (location) {
      navigate(`/properties?location=${encodeURIComponent(location)}`);
      return;
    }

    navigate('/plan-your-trip');
  };

  return (
    <>
      <Helmet>
        <title>Kuttanad Tourism | Kerala Backwaters &amp; Houseboat Trip Planner</title>
        <meta
          name="description"
          content="Plan a custom Kuttanad & Alappuzha trip — houseboats, homestays, destinations and experiences, booked straight to WhatsApp."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-backwater-900 text-white">
        <HeroCarousel />
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Kuttanad · Alappuzha · Kerala
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Discover Kerala,
            <br /> One Backwater Journey at a Time.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-backwater-100">
            Stay on the backwaters, explore Kuttanad, and create a Kerala experience made around
            you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button as={Link} to="/plan-your-trip" variant="primary">
              Plan Your Trip
            </Button>
            <Button as={Link} to="/properties?type=Houseboat" variant="secondary">
              Explore Houseboats
            </Button>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 text-left shadow-xl sm:flex-row sm:items-center dark:bg-charcoal-800/90 dark:shadow-2xl dark:ring-1 dark:ring-white/10"
          >
            <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 text-charcoal-900 dark:text-sand-50 sm:border-r sm:border-backwater-100 dark:sm:border-white/10">
              <MapPin size={18} className="flex-shrink-0 text-backwater-500 dark:text-gold-400" />
              <input
                type="text"
                value={searchForm.location}
                onChange={(e) => updateSearchField('location', e.target.value)}
                placeholder="Where to? e.g. Kuttanad"
                className="w-full text-sm outline-none placeholder:text-charcoal-800/50"
              />
            </label>
            <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 text-charcoal-900 dark:text-sand-50 sm:border-r sm:border-backwater-100 dark:sm:border-white/10">
              <Calendar size={18} className="flex-shrink-0 text-backwater-500 dark:text-gold-400" />
              <input
                type="date"
                value={searchForm.startDate}
                onChange={(e) => updateSearchField('startDate', e.target.value)}
                aria-label="Start date"
                className="w-full min-w-0 text-sm outline-none"
              />
              <span className="text-charcoal-800/40 dark:text-sand-100/40">–</span>
              <input
                type="date"
                value={searchForm.endDate}
                min={searchForm.startDate || undefined}
                onChange={(e) => updateSearchField('endDate', e.target.value)}
                aria-label="End date"
                className="w-full min-w-0 text-sm outline-none"
              />
            </div>
            <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 text-charcoal-900 dark:text-sand-50">
              <Users size={18} className="flex-shrink-0 text-backwater-500 dark:text-gold-400" />
              <input
                type="number"
                min="1"
                value={searchForm.guests}
                onChange={(e) => updateSearchField('guests', e.target.value)}
                placeholder="Guests"
                className="w-full text-sm outline-none placeholder:text-charcoal-800/50"
              />
            </label>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-backwater-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-backwater-900 dark:bg-gold-500 dark:text-charcoal-900 dark:hover:bg-gold-400"
            >
              <Search size={16} /> Search
            </button>
          </form>
        </motion.div>
      </section>

      {/* Featured Houseboats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured Houseboats"
          description="Premium kettuvallam houseboats ready for your Kuttanad cruise."
        />
        <DataGrid
          state={properties}
          onRetry={loadHomeData}
          renderItem={(p) => <PropertyCard key={p._id} property={p} />}
          emptyLabel="No featured houseboats yet."
        />
        <div className="mt-8 text-center">
          <Button as={Link} to="/properties?type=Houseboat" variant="secondary">
            View all houseboats
          </Button>
        </div>
      </section>

      {/* Explore Kuttanad */}
      <section className="bg-backwater-50 py-16 dark:bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <img
            src="https://akoyabeachvilla.com/wp-content/uploads/2025/08/image_0-2.webp"
            alt="Kuttanad paddy fields"
            className="h-72 w-full rounded-2xl object-cover"
          />
          <div>
            <SectionHeading
              eyebrow="The Rice Bowl of Kerala"
              title="Explore Kuttanad"
              description="A vast network of canals, rivers, and paddy fields farmed below sea level — Kuttanad is unlike anywhere else in India. Cruise its backwaters, walk its village bunds, and taste food grown right along the water."
            />
            <Button as={Link} to="/destinations" variant="primary">
              Explore Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Where to go"
          title="Popular Destinations"
          description="From backwater lakes to quiet beaches, these are the places tourists ask for most."
        />
        <DataGrid
          state={destinations}
          onRetry={loadHomeData}
          renderItem={(d) => <DestinationCard key={d._id} destination={d} />}
          emptyLabel="No featured destinations yet."
        />
        <div className="mt-8 text-center">
          <Button as={Link} to="/destinations" variant="secondary">
            View all destinations
          </Button>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-backwater-50 py-16 dark:bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Things to do"
            title="Experiences"
            description="Add these to your itinerary to make the trip your own."
          />
          <DataGrid
            state={activities}
            onRetry={loadHomeData}
            renderItem={(a) => <ActivityCard key={a._id} activity={a} />}
            emptyLabel="No featured experiences yet."
          />
          <div className="mt-8 text-center">
            <Button as={Link} to="/activities" variant="secondary">
              View all experiences
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Why us" title="Why Choose Us" align="center" />
        <FadeIn className="grid gap-6 sm:grid-cols-3">
          {WHY_CHOOSE_US.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-backwater-100 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-charcoal-800/60"
            >
              <Icon className="mx-auto mb-3 text-backwater-700" size={28} />
              <h3 className="font-display text-lg font-semibold text-backwater-900 dark:text-sand-50">{title}</h3>
              <p className="mt-2 text-sm text-charcoal-800/80 dark:text-sand-100/70">{description}</p>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* How it works */}
      <section className="bg-backwater-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Simple by design" title="How It Works" align="center" />
          <FadeIn className="grid gap-6 sm:grid-cols-4">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="font-display text-3xl font-semibold text-gold-400">{step}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-backwater-100/80">{description}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Traveller stories"
          title="Testimonials"
          align="center"
          description="Demo testimonials for this sample build."
        />
        <FadeIn className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-backwater-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-charcoal-800/60">
              <Sparkles className="mb-3 text-gold-400" size={20} />
              <blockquote className="text-sm text-charcoal-800 dark:text-sand-100/90">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-backwater-900 dark:text-sand-50">
                {t.name} <span className="font-normal text-charcoal-800/60 dark:text-sand-100/50">· {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-backwater-50 px-6 py-12 text-center dark:bg-white/5">
          <h2 className="font-display text-2xl font-semibold text-backwater-900 dark:text-sand-50 sm:text-3xl">
            Ready to plan your Kuttanad trip?
          </h2>
          <p className="max-w-xl text-charcoal-800 dark:text-sand-100/80">
            Build a custom itinerary in a few steps, then send it to us on WhatsApp for pricing
            and availability.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button as={Link} to="/plan-your-trip" variant="primary">
              Plan Your Trip
            </Button>
            <WhatsAppButton
              message="Hello Kuttanad Tourism, I would like to enquire about a customized Kerala trip."
              label="Chat on WhatsApp"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
