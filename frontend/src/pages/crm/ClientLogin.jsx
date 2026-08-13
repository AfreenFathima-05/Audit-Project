import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCRM } from '../../context/CRMContext';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [slowLoading, setSlowLoading] = useState(false);
  const { login, loginWithGoogle } = useCRM();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    setSlowLoading(false);
    
    // Set a timer to show "waking up server" message if it takes more than 3 seconds (Render cold start)
    const slowTimer = setTimeout(() => setSlowLoading(true), 3000);

    try {
      await login(email, password, 'client');
      clearTimeout(slowTimer);
      navigate('/crm/client/dashboard');
    } catch (err) {
      clearTimeout(slowTimer);
      setError(err.message);
    } finally {
      setSubmitting(false);
      setSlowLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle('client');
      navigate('/crm/client/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-charcoal relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Orbs for glassmorphism effect */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-theme-olive/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-theme-bronze/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-2xl relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center shadow-sm border border-theme-bronze/30 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-theme-bronze/10 to-transparent opacity-50"></div>
            <span className="font-serif text-theme-ivory font-bold text-2xl tracking-tighter flex items-center relative z-10">
              A<span className="text-theme-bronze font-light italic text-xl mx-0.5">&</span>C
            </span>
          </div>
          <h2 className="mt-2 text-center text-3xl font-serif text-theme-ivory tracking-wide">Client Portal</h2>
          <p className="text-theme-stone text-sm mt-2 font-light">
            {isSignUp ? 'Create a new account' : 'Sign in to access your dashboard'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="sr-only">Email address</label>
              <input
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 border border-white/10 placeholder-white/30 text-theme-ivory rounded-lg focus:outline-none focus:ring-1 focus:ring-theme-bronze focus:border-theme-bronze sm:text-sm bg-white/5 transition-colors"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 border border-white/10 placeholder-white/30 text-theme-ivory rounded-lg focus:outline-none focus:ring-1 focus:ring-theme-bronze focus:border-theme-bronze sm:text-sm bg-white/5 transition-colors"
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm uppercase tracking-widest font-bold rounded-lg text-theme-charcoal bg-theme-bronze hover:bg-[#A38A66] transition-all duration-300 focus:outline-none disabled:opacity-60 shadow-lg hover:shadow-xl"
            >
              {submitting ? (slowLoading ? 'Waking up server (takes up to 50s)...' : (isSignUp ? 'Creating account...' : 'Signing in...')) : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-theme-bronze hover:text-theme-ivory transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[#242A27] text-white/50 rounded-full">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center px-4 py-3 border border-white/10 shadow-sm text-sm font-medium rounded-lg text-theme-ivory bg-white/5 hover:bg-white/10 transition-colors"
            >
              <img className="h-5 w-5 mr-3" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
