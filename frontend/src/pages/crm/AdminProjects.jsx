import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import StatusBadge from '../../components/crm/StatusBadge';
import { FolderOpen, FileText, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminProjects = () => {
  const { currentUser, tasks, users, logout, assignTask } = useCRM();
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedJunior, setSelectedJunior] = useState('');

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/crm/admin/login" replace />;
  }

  const clients = users.filter(u => u.role === 'client');
  const juniors = users.filter(u => u.role === 'junior');

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (newTaskTitle && selectedClient && selectedJunior) {
      assignTask(newTaskTitle, selectedClient, selectedJunior);
      setNewTaskTitle('');
      setSelectedClient('');
      setSelectedJunior('');
    }
  };

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar title="Admin Portal" subtitle="Firm Projects" userName={currentUser.name} userRole="Senior Partner" onLogout={logout} />
      <div className="flex flex-1">
        <PortalSidebar role="admin" />
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">Firm Projects</h2>
            <p className="text-portal-muted">Oversee ongoing projects and engagements across the entire firm.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-portal-card p-8 rounded-xl shadow-sm border border-portal-line mb-10">
            <h3 className="text-lg font-serif text-portal-ink mb-6 flex items-center gap-2 border-b border-portal-line pb-4"><Plus className="text-portal-gold" /> Create New Project</h3>
            <form onSubmit={handleAssignTask} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2">Project Title</label>
                <input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} required className="w-full border border-portal-line p-3 rounded-md focus:outline-none focus:border-theme-charcoal focus:ring-1 focus:ring-theme-charcoal bg-portal-bg" placeholder="e.g. Annual Tax Audit" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2">Client</label>
                <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} required className="w-full border border-portal-line p-3 rounded-md focus:outline-none focus:border-theme-charcoal focus:ring-1 focus:ring-theme-charcoal bg-portal-bg">
                  <option value="">Select Client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2">Assign Auditor</label>
                <select value={selectedJunior} onChange={e => setSelectedJunior(e.target.value)} required className="w-full border border-portal-line p-3 rounded-md focus:outline-none focus:border-theme-charcoal focus:ring-1 focus:ring-theme-charcoal bg-portal-bg">
                  <option value="">Assign To</option>
                  {juniors.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
                </select>
              </div>
              <div className="md:col-span-4 flex justify-end mt-2">
                <button type="submit" className="bg-theme-charcoal text-theme-ivory px-8 py-3 rounded-md text-sm uppercase tracking-widest font-medium hover:bg-theme-olive transition-colors shadow-sm">Create Project</button>
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden">
            <div className="p-6 border-b border-portal-line bg-portal-bg flex items-center gap-2">
              <FolderOpen className="text-portal-gold" />
              <h3 className="text-lg font-serif text-portal-ink">All Projects</h3>
            </div>
            <div className="divide-y divide-portal-line">
              {tasks.length > 0 ? tasks.map(task => (
                <div key={task.id} className="p-6 hover:bg-portal-bg transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1.5">
                    <h4 className="font-semibold text-portal-ink text-lg">{task.title}</h4>
                    <div className="flex gap-4 text-sm text-portal-muted">
                      <span><strong className="text-portal-ink">Client:</strong> {task.clientName || 'Unknown'}</span>
                      <span><strong className="text-portal-ink">Auditor:</strong> {task.juniorName || 'Unknown'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 min-w-[150px]">
                    <StatusBadge status={task.status} />
                    {task.reportDocument && (
                      <span className="text-xs text-portal-gold flex items-center gap-1 font-medium bg-portal-gold-soft px-2 py-1 rounded">
                        <FileText size={12}/> {task.reportDocument}
                      </span>
                    )}
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center text-portal-muted font-serif text-lg">No projects created yet.</div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
