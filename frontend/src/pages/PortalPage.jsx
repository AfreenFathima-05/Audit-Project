import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCRM } from '../context/CRMContext';
import { Shield, User, Users, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PortalPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialRole = searchParams.get('role') || 'client';

  const [activeRole, setActiveRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPasswordView, setIsForgotPasswordView] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { login, loginWithGoogle, resetPassword } = useCRM();
  const navigate = useNavigate();

  const roles = [
    { id: 'client', label: 'Client Portal', icon: User, color: 'theme-olive' },
    { id: 'admin', label: 'Admin Portal', icon: Shield, color: 'theme-bronze' },
    { id: 'junior', label: 'Junior Portal', icon: Users, color: 'theme-charcoal' }
  ];

  const loginContent = {
    client: { title: 'Welcome Back', subtitle: 'Access your secure financial vault and project updates.', redirect: '/crm/client/dashboard' },
    admin: { title: 'Command Center', subtitle: 'Firm-wide overview and engagement management.', redirect: '/crm/admin/dashboard' },
    junior: { title: 'Auditor Workspace', subtitle: 'Manage your assigned fieldwork and submit reports.', redirect: '/crm/junior/dashboard' }
  };

  const handleRoleChange = (roleId) => {
    setActiveRole(roleId);
    setError('');
    setSuccessMessage('');
    setEmail('');
    setPassword('');
    setNewPassword('');
    setIsForgotPasswordView(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setSubmitting(true);
    try {
      const msg = await resetPassword(email, newPassword);
      setSuccessMessage(msg);
      setPassword('');
      setTimeout(() => {
        setIsForgotPasswordView(false);
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Password reset failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password, activeRole);
      navigate(loginContent[activeRole].redirect);
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle(activeRole);
      navigate(loginContent[activeRole].redirect);
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen bg-theme-ivory pt-32 pb-24 text-theme-charcoal flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full">
        
        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-serif mb-4">
            Aurilious & Co. <span className="italic text-theme-olive">Portal</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-theme-stone text-lg max-w-2xl mx-auto font-light">
            Select your role to access your personalized workspace.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-theme-charcoal/5 flex flex-col md:flex-row min-h-[500px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-theme-charcoal text-white p-8 flex flex-col">
            <h3 className="text-xs uppercase tracking-widest text-white/50 font-bold mb-6">Select Gateway</h3>
            <div className="space-y-3 flex-grow">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleChange(role.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${isActive ? 'bg-theme-olive text-white shadow-lg' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-semibold text-sm tracking-wide">{role.label}</span>
                    </div>
                    {isActive && <CheckCircle size={16} className="text-white/80" />}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-xs text-white/40">
              <p>Secure SSL Encrypted Connection</p>
              <p className="mt-1">© {new Date().getFullYear()} Aurilious & Co.</p>
            </div>
          </div>

          {/* Login Form Area */}
          <div className="w-full md:w-2/3 p-8 md:p-12 bg-white relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-center max-w-md mx-auto"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-serif text-theme-charcoal mb-2">
                    {isForgotPasswordView ? 'Reset Password' : loginContent[activeRole].title}
                  </h2>
                  <p className="text-theme-stone text-sm">
                    {isForgotPasswordView ? 'Enter your email and a new password to reset it.' : loginContent[activeRole].subtitle}
                  </p>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}
                {successMessage && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">{successMessage}</div>}

                {!isForgotPasswordView ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-theme-stone font-semibold mb-2">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full border border-theme-charcoal/20 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-theme-olive focus:border-theme-olive bg-theme-ivory/50"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-xs uppercase tracking-widest text-theme-stone font-semibold">Password</label>
                          <button 
                            type="button" 
                            onClick={() => setIsForgotPasswordView(true)}
                            className="text-xs font-semibold text-theme-olive hover:text-theme-olive/80 transition-colors"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full border border-theme-charcoal/20 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-theme-olive focus:border-theme-olive bg-theme-ivory/50"
                          placeholder="Enter your password"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-theme-charcoal text-white py-3.5 rounded-lg text-sm uppercase tracking-widest font-bold hover:bg-theme-olive transition-colors shadow-md mt-4 disabled:opacity-70"
                      >
                        {submitting ? 'Authenticating...' : 'Sign In Securely'}
                      </button>
                    </form>

                    <div className="mt-8">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-theme-charcoal/10" /></div>
                        <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-theme-stone text-xs uppercase tracking-widest font-semibold">Or continue with</span></div>
                      </div>
                      <button
                        onClick={handleGoogleLogin}
                        className="mt-6 w-full flex justify-center items-center px-4 py-3 border border-theme-charcoal/20 shadow-sm text-sm font-semibold rounded-lg text-theme-charcoal bg-white hover:bg-theme-ivory transition-colors"
                      >
                        <img className="h-5 w-5 mr-3" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
                        Google Single Sign-On
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-theme-stone font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border border-theme-charcoal/20 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-theme-olive focus:border-theme-olive bg-theme-ivory/50"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-theme-stone font-semibold mb-2">New Password</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full border border-theme-charcoal/20 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-theme-olive focus:border-theme-olive bg-theme-ivory/50"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsForgotPasswordView(false)}
                        className="w-1/3 bg-theme-stone/10 text-theme-charcoal py-3.5 rounded-lg text-sm uppercase tracking-widest font-bold hover:bg-theme-stone/20 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-2/3 bg-theme-charcoal text-white py-3.5 rounded-lg text-sm uppercase tracking-widest font-bold hover:bg-theme-olive transition-colors shadow-md disabled:opacity-70"
                      >
                        {submitting ? 'Resetting...' : 'Reset Password'}
                      </button>
                    </div>
                  </form>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortalPage;
