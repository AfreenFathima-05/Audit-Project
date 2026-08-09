import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCRM } from '../../context/CRMContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, loginWithGoogle } = useCRM();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password, 'admin');
      navigate('/crm/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle('admin');
      navigate('/crm/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-charcoal py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-theme-ivory p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif text-theme-charcoal">Admin Login</h2>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-theme-charcoal/20 placeholder-theme-charcoal/50 text-theme-charcoal rounded-t-md focus:outline-none focus:ring-theme-bronze focus:border-theme-bronze sm:text-sm bg-transparent"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-theme-charcoal/20 placeholder-theme-charcoal/50 text-theme-charcoal rounded-b-md focus:outline-none focus:ring-theme-bronze focus:border-theme-bronze sm:text-sm bg-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm uppercase tracking-widest font-bold rounded-md text-theme-ivory bg-theme-bronze hover:bg-[#A38A66] transition-colors focus:outline-none disabled:opacity-60 shadow-md"
            >
              {submitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-theme-charcoal/20" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-theme-ivory text-theme-charcoal/70">Or continue with</span></div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center px-4 py-2 border border-theme-charcoal/20 shadow-sm text-sm font-medium rounded-md text-theme-charcoal bg-transparent hover:bg-theme-charcoal/5 transition-colors"
            >
              <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
