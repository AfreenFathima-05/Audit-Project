import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import { Settings, User, Mail, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSettings = () => {
  const { currentUser, logout } = useCRM();

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/crm/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar title="Admin Portal" subtitle="System Settings" userName={currentUser.name} userRole="Senior Partner" onLogout={logout} />
      <div className="flex flex-1">
        <PortalSidebar role="admin" />
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">System Settings</h2>
            <p className="text-portal-muted">Configure platform settings, user permissions, and integrations.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-portal-card max-w-2xl rounded-xl shadow-sm border border-portal-line overflow-hidden">
            <div className="p-6 border-b border-portal-line bg-portal-bg flex items-center gap-2">
              <Settings className="text-portal-gold" />
              <h3 className="text-lg font-serif text-portal-ink">Profile Settings</h3>
            </div>
            <div className="p-8 space-y-6">
              
              <div className="flex items-center gap-4 pb-6 border-b border-portal-line">
                <div className="w-16 h-16 rounded-full bg-theme-charcoal flex items-center justify-center text-theme-ivory text-2xl font-serif">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-portal-ink">{currentUser.name}</h4>
                  <p className="text-portal-muted text-sm capitalize">{currentUser.role} Account</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2 flex items-center gap-1"><User size={14}/> Full Name</label>
                  <input type="text" readOnly value={currentUser.name} className="w-full border border-portal-line p-3 rounded-md bg-portal-bg/50 text-portal-muted cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2 flex items-center gap-1"><Mail size={14}/> Email Address</label>
                  <input type="email" readOnly value={currentUser.email} className="w-full border border-portal-line p-3 rounded-md bg-portal-bg/50 text-portal-muted cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2 flex items-center gap-1"><Briefcase size={14}/> Role</label>
                  <input type="text" readOnly value={currentUser.role} className="w-full border border-portal-line p-3 rounded-md bg-portal-bg/50 text-portal-muted cursor-not-allowed capitalize" />
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-theme-charcoal text-theme-ivory px-6 py-2.5 rounded-md text-sm uppercase tracking-widest font-medium hover:bg-theme-olive transition-colors shadow-sm opacity-50 cursor-not-allowed" disabled>Update Profile</button>
                <p className="text-xs text-portal-muted mt-2">Profile updates are currently managed via the backend.</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
