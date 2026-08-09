import React, { useMemo } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import DonutChart from '../../components/crm/DonutChart';
import BarList from '../../components/crm/BarList';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminReports = () => {
  const { currentUser, tasks, users, logout } = useCRM();

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/crm/admin/login" replace />;
  }

  const juniors = users.filter(u => u.role === 'junior');

  const statusCounts = useMemo(() => ({
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  }), [tasks]);

  const juniorWorkload = useMemo(() => (
    juniors.map(j => ({ label: j.name.split(' ')[0], value: tasks.filter(t => t.juniorId === j.id).length }))
  ), [tasks, juniors]);

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar title="Admin Portal" subtitle="Analytics & Reports" userName={currentUser.name} userRole="Senior Partner" onLogout={logout} />
      <div className="flex flex-1">
        <PortalSidebar role="admin" />
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">Analytics & Reports</h2>
            <p className="text-portal-muted">Generate comprehensive reports on performance, profitability, and compliance.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-portal-card p-6 rounded-xl border border-portal-line shadow-sm">
              <h3 className="text-lg font-serif text-portal-ink mb-6 flex items-center gap-2"><FileText size={18} className="text-portal-gold"/> Engagements by Status</h3>
              <DonutChart
                segments={[
                  { label: 'Pending', value: statusCounts.pending, color: 'var(--color-portal-warning)' },
                  { label: 'In Progress', value: statusCounts.in_progress, color: 'var(--color-portal-gold)' },
                  { label: 'In Review', value: statusCounts.review, color: 'var(--color-portal-review)' },
                  { label: 'Finalized', value: statusCounts.completed, color: 'var(--color-portal-success)' },
                ]}
              />
            </div>
            
            <div className="bg-portal-card p-6 rounded-xl border border-portal-line shadow-sm">
              <h3 className="text-lg font-serif text-portal-ink mb-6 flex items-center gap-2"><FileText size={18} className="text-portal-gold"/> Workload by Associate</h3>
              {juniorWorkload.length > 0
                ? <BarList items={juniorWorkload} />
                : <p className="text-portal-muted text-sm">No associates on the team yet.</p>}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AdminReports;
