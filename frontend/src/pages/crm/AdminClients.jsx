import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import { Users } from 'lucide-react';

const AdminClients = () => {
  const { currentUser, users, logout } = useCRM();

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/crm/admin/login" replace />;
  }

  const clients = users.filter(u => u.role === 'client');

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar title="Admin Portal" subtitle="Client Directory" userName={currentUser.name} userRole="Senior Partner" onLogout={logout} />
      <div className="flex flex-1">
        <PortalSidebar role="admin" />
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">Client Directory</h2>
            <p className="text-portal-muted">Manage all your firm's clients and their organizations in one place.</p>
          </div>

          <div className="bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden">
            <div className="p-6 border-b border-portal-line bg-portal-bg flex items-center gap-2">
              <Users className="text-portal-gold" />
              <h3 className="text-lg font-serif text-portal-ink">All Clients</h3>
            </div>
            <div className="divide-y divide-portal-line">
              {clients.length > 0 ? clients.map(client => (
                <div key={client.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h4 className="font-semibold text-portal-ink text-lg">{client.name}</h4>
                    <p className="text-sm text-portal-muted">{client.email}</p>
                  </div>
                  <div className="mt-2 md:mt-0 bg-portal-bg px-3 py-1 rounded border border-portal-line">
                    <span className="text-xs text-portal-muted uppercase tracking-wider">{client.company || 'No Company listed'}</span>
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center text-portal-muted font-serif text-lg">No clients registered yet.</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminClients;
