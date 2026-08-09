import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import StatusBadge from '../../components/crm/StatusBadge';
import { ClipboardList, Flag, Check, CheckCircle, Upload, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const JuniorTasks = () => {
  const { currentUser, tasks, users, logout, startTask, submitReport } = useCRM();
  const [reportUrls, setReportUrls] = useState({});

  if (!currentUser || currentUser.role !== 'junior') {
    return <Navigate to="/crm/junior/login" replace />;
  }

  const myTasks = tasks.filter(t => t.juniorId === currentUser.id);

  const handleUrlChange = (id, val) => {
    setReportUrls(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar title="Junior Portal" subtitle="My Tasks" userName={currentUser.name} userRole="Field Auditor" onLogout={logout} />
      <div className="flex flex-1">
        <PortalSidebar role="junior" />
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">My Tasks</h2>
            <p className="text-portal-muted">Track and manage your assigned audit tasks and engagements.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {myTasks.length > 0 ? myTasks.map(task => {
              const client = users.find(u => u.id === task.clientId);
              const priority = task.id.charCodeAt(0) % 3 === 0 ? 'High' : task.id.charCodeAt(0) % 3 === 1 ? 'Medium' : 'Low';
              const prioColor = priority === 'High' ? 'text-portal-danger bg-portal-danger-soft' : priority === 'Medium' ? 'text-portal-warning bg-portal-warning-soft' : 'text-portal-success bg-portal-success-soft';

              return (
                <div key={task.id} className="bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <h4 className="font-semibold text-portal-ink text-xl">{task.title}</h4>
                        <StatusBadge status={task.status} />
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${prioColor}`}>
                          <Flag size={12} /> {priority} Priority
                        </span>
                      </div>

                      <div className="bg-portal-bg p-4 rounded-md border border-portal-line text-sm">
                        <span className="text-portal-muted uppercase tracking-widest text-xs font-semibold block mb-1">Client Organization</span>
                        <span className="font-medium text-portal-ink text-base">{client?.name || 'Unknown'}</span>
                      </div>

                      {task.feedback && (
                        <div className="bg-portal-danger-soft text-portal-danger p-4 rounded-md border-l-4 border-portal-danger text-sm">
                          <span className="font-bold block mb-1 flex items-center gap-1"><AlertCircle size={14}/> Partner Revision Request:</span>
                          {task.feedback}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center bg-portal-bg p-6 rounded-lg border border-portal-line min-w-[280px]">
                      {task.status === 'pending' && (
                        <button onClick={() => startTask(task.id)} className="w-full bg-theme-charcoal text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-theme-olive transition-colors shadow-sm flex justify-center items-center gap-2">
                          <Check size={16}/> Start Fieldwork
                        </button>
                      )}

                      {task.status === 'in_progress' && (
                        <div className="space-y-3">
                          <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold">Upload Findings</label>
                          <input
                            type="text"
                            placeholder="Report URL or Document Name"
                            value={reportUrls[task.id] || ''}
                            onChange={e => handleUrlChange(task.id, e.target.value)}
                            className="w-full border border-portal-line rounded-md px-4 py-2.5 text-sm focus:ring-1 focus:ring-theme-olive focus:border-theme-olive bg-white"
                          />
                          <button onClick={() => {
                            if(reportUrls[task.id]) { submitReport(task.id, reportUrls[task.id]); handleUrlChange(task.id, ''); }
                            else { alert('Please provide a document reference.'); }
                          }} className="w-full bg-theme-olive text-white px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-theme-charcoal transition-colors shadow-sm flex justify-center items-center gap-2">
                            <Upload size={16}/> Submit to Partner
                          </button>
                        </div>
                      )}

                      {(task.status === 'review' || task.status === 'completed') && (
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 bg-portal-success-soft text-portal-success rounded-full flex items-center justify-center mx-auto mb-2">
                            <CheckCircle size={24} />
                          </div>
                          <p className="text-sm font-medium text-portal-ink">Submission Logged</p>
                          {task.reportDocument && (
                            <span className="text-xs text-portal-muted bg-white border border-portal-line px-3 py-1.5 rounded-full inline-block max-w-[200px] truncate" title={task.reportDocument}>
                              {task.reportDocument}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-20 text-portal-muted bg-portal-card border border-portal-line rounded-xl">
                <ClipboardList size={48} className="mx-auto mb-4 opacity-20" />
                <p>You have no assigned engagements at this time.</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default JuniorTasks;
