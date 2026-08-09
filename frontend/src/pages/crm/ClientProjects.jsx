import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import StatusBadge from '../../components/crm/StatusBadge';
import { FolderOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientProjects = () => {
  const { currentUser, tasks, logout } = useCRM();

  if (!currentUser || currentUser.role !== 'client') {
    return <Navigate to="/crm/client/login" replace />;
  }

  const myProjects = tasks.filter(t => t.clientId === currentUser.id);

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar title="Client Portal" subtitle="My Projects" userName={currentUser.name} userRole={currentUser.company || 'Client'} onLogout={logout} />
      <div className="flex flex-1">
        <PortalSidebar role="client" />
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">My Projects</h2>
            <p className="text-portal-muted">View all your active engagements and historical projects with the firm.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden">
            <div className="p-6 border-b border-portal-line bg-portal-bg flex items-center gap-2">
              <FolderOpen className="text-portal-gold" />
              <h3 className="text-lg font-serif text-portal-ink">All Projects</h3>
            </div>
            <div className="divide-y divide-portal-line">
              {myProjects.length > 0 ? myProjects.map(task => (
                <div key={task.id} className="p-6 hover:bg-portal-bg transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1.5">
                    <h4 className="font-semibold text-portal-ink text-lg">{task.title}</h4>
                    <p className="text-sm text-portal-muted">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3 min-w-[150px]">
                    <StatusBadge status={task.status} />
                    {task.reportDocument && task.status === 'completed' && (
                      <span className="text-xs text-portal-success flex items-center gap-1 font-medium bg-portal-success-soft px-2 py-1 rounded">
                        <FileText size={12}/> {task.reportDocument}
                      </span>
                    )}
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center text-portal-muted font-serif text-lg">No projects found.</div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ClientProjects;
