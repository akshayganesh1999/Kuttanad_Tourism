import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import Button from '../components/Button';
import { login } from '../services/authService';
import { setCredentials } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!form.email) nextErrors.email = 'Email is required.';
    if (!form.password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const { user, token } = await login(form);
      dispatch(setCredentials({ user, token }));
      toast.success(`Welcome back, ${user.name}`);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Kuttanad Tourism</title>
      </Helmet>

      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="mb-6 text-center font-display text-2xl font-semibold text-backwater-900">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-backwater-100 bg-white p-6 shadow-sm"
        >
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
            {submitting ? 'Logging in…' : 'Login'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-charcoal-800/70">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-backwater-700 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
