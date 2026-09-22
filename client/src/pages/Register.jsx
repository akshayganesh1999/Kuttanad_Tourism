import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import Button from '../components/Button';
import { register } from '../services/authService';
import { setCredentials } from '../features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!/^[+]?[\d\s-]{7,15}$/.test(form.phone)) nextErrors.phone = 'Please enter a valid phone number.';
    if (form.password.length < 8 || !/\d/.test(form.password)) {
      nextErrors.password = 'Password must be at least 8 characters and include a number.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const { user, token } = await register(form);
      dispatch(setCredentials({ user, token }));
      toast.success(`Welcome to Kuttanad Tourism, ${user.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account | Kuttanad Tourism</title>
      </Helmet>

      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="mb-6 text-center font-display text-2xl font-semibold text-backwater-900">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-backwater-100 bg-white p-6 shadow-sm"
        >
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-backwater-900">Full Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-backwater-500 ${
                errors.name ? 'border-red-400' : 'border-backwater-100'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-backwater-900">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-backwater-500 ${
                errors.email ? 'border-red-400' : 'border-backwater-100'
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-backwater-900">Phone</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-backwater-500 ${
                errors.phone ? 'border-red-400' : 'border-backwater-100'
              }`}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-backwater-900">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-backwater-500 ${
                errors.password ? 'border-red-400' : 'border-backwater-100'
              }`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </label>

          <Button type="submit" variant="primary" disabled={submitting} className="w-full">
            {submitting ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-charcoal-800/70">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-backwater-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
