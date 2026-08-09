import React from 'react';
import { useCRM } from '../../context/CRMContext';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const GenericPortalPage = ({ role, title, subtitle }) => {
  const { currentUser, logout } = useCRM();

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar
        title={`Aurilious & Co. — ${role === 'admin' ? 'Admin' : role === 'junior' ? 'Junior' : 'Client'} Portal`}
        subtitle={role === 'admin' ? 'Administrative Dashboard' : role === 'junior' ? 'Auditor Workspace' : 'Client Services'}
        userName={currentUser?.name || ''}
        userRole={currentUser?.company || currentUser?.role?.toUpperCase() || ''}
        onLogout={logout}
      />

      <div className="flex flex-1">
        <PortalSidebar role={role} />
        
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">{title}</h2>
            <p className="text-portal-muted">{subtitle || 'This module is currently under construction.'}</p>
          </motion.div>

          {title === 'Client Directory' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-portal-card border border-portal-line rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-portal-bg border-b border-portal-line text-xs uppercase tracking-widest text-portal-muted">
                    <th className="p-4 font-semibold">Client Name</th>
                    <th className="p-4 font-semibold">Contact Email</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-portal-line">
                  {['Vertex Tech', 'Horizon Logistics', 'Aura Financial', 'Summit Healthcare'].map(name => (
                    <tr key={name} className="hover:bg-theme-ivory/30 transition-colors">
                      <td className="p-4 font-medium text-portal-ink">{name}</td>
                      <td className="p-4 text-sm text-portal-muted">contact@{name.toLowerCase().replace(' ', '')}.com</td>
                      <td className="p-4"><span className="px-2 py-1 bg-portal-success-soft text-portal-success text-xs rounded-full font-bold">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {title === 'Firm Projects' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-portal-card border border-portal-line p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-portal-ink mb-2">Q{i%4 + 1} Financial Audit</h4>
                  <p className="text-sm text-portal-muted mb-4">Assigned to: Auditor {i}</p>
                  <div className="w-full bg-portal-bg h-2 rounded-full overflow-hidden">
                    <div className="bg-theme-olive h-full" style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}></div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {title !== 'Client Directory' && title !== 'Firm Projects' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-portal-card border border-portal-line rounded-xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-20 h-20 bg-theme-olive/10 text-theme-olive rounded-full flex items-center justify-center mb-6">
                <Settings size={40} className="animate-[spin_4s_linear_infinite]" />
              </div>
              <h3 className="text-xl font-serif text-portal-ink mb-2">{title} module is coming soon</h3>
              <p className="text-portal-muted max-w-md mx-auto">
                We're currently building out this feature to bring you a more powerful and seamless enterprise experience. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericPortalPage;
