import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, Download, ShieldCheck, FileSpreadsheet, FileCheck2, ArrowRight, Briefcase, AlertCircle } from 'lucide-react';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import StatCard from '../../components/crm/StatCard';

const REFERENCE_DOCS = [
  { title: 'Compliance Checklist 2026', icon: ShieldCheck },
  { title: 'Audit Preparation Guide', icon: FileCheck2 },
  { title: 'Tax Strategy Framework', icon: FileSpreadsheet },
];

const ClientDashboard = () => {
  const { currentUser, tasks, logout } = useCRM();

  if (!currentUser || currentUser.role !== 'client') {
    return <Navigate to="/crm/client/login" replace />;
  }

  const myTasks = tasks.filter(t => t.clientId === currentUser.id);
  const finalized = myTasks.filter(t => t.status === 'completed').length;
  const inProgress = myTasks.length - finalized;

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar
        title="Aurilious & Co. Portal"
        subtitle="Client Portal"
        userName={currentUser.name}
        userRole={currentUser.email}
        onLogout={logout}
      />

      <div className="flex flex-1">
        <PortalSidebar role="client" />
        
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] via-[#E9EDF1] to-[#E2E6EA]">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-serif text-portal-ink mb-2">Welcome, {currentUser.name.split(' ')[0]}</h2>
            <p className="text-portal-muted">Track your active engagements and securely exchange documents.</p>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
            <StatCard icon={Briefcase} label="All Projects" value={myTasks.length} accent="gold" />
            <StatCard icon={AlertCircle} label="In Progress" value={inProgress} accent="blue" />
            <StatCard icon={CheckCircle} label="Finalized" value={finalized} accent="success" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden">
          <div className="p-8 border-b border-portal-line bg-portal-bg flex items-center gap-3">
             <FileText className="text-portal-gold" size={24} />
             <h3 className="text-2xl font-serif text-portal-ink">Your Document Vault</h3>
          </div>

          <div className="divide-y divide-portal-line">
            {myTasks.map(task => (
              <div key={task.id} className="p-8 hover:bg-portal-bg transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                <div className="space-y-2">
                  <h4 className="font-semibold text-portal-ink text-xl">{task.title}</h4>

                  {task.status === 'completed' ? (
                    <span className="text-portal-success bg-portal-success-soft px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1 w-max">
                      <CheckCircle size={12}/> Finalized &amp; Available
                    </span>
                  ) : (
                     <span className="text-portal-gold bg-portal-gold-soft px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1 w-max">
                      <Clock size={12}/> Engagement In Progress
                    </span>
                  )}
                </div>

                <div className="w-full md:w-auto">
                  {task.status === 'completed' ? (
                    <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-theme-charcoal text-white px-8 py-4 rounded-lg text-sm font-semibold uppercase tracking-widest hover:bg-theme-olive hover:shadow-lg transition-all transform group-hover:-translate-y-0.5">
                      <Download size={18} /> Download Final Report
                    </button>
                  ) : (
                    <div className="bg-portal-bg border border-portal-line px-6 py-4 rounded-lg flex items-center gap-3 text-portal-muted text-sm">
                      <Clock size={18} className="text-portal-muted" />
                      <span>Report generation is ongoing.<br/>You will be notified upon completion.</span>
                    </div>
                  )}
                </div>

                {/* Progress Timeline Addition */}
                {task.status !== 'completed' && (
                  <div className="w-full mt-4 pt-4 border-t border-portal-line">
                    <p className="text-xs font-semibold text-portal-muted uppercase tracking-wider mb-3">Engagement Progress</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-portal-ink">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-portal-success-soft text-portal-success rounded"><CheckCircle size={14}/> Intake</div>
                      <ArrowRight size={14} className="text-portal-line" />
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${task.status === 'in_progress' ? 'bg-portal-gold-soft text-portal-gold' : 'bg-portal-success-soft text-portal-success'}`}><Clock size={14}/> Auditing</div>
                      <ArrowRight size={14} className="text-portal-line" />
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${task.status === 'review' ? 'bg-portal-review-soft text-portal-review' : 'bg-portal-bg border border-portal-line text-portal-muted'}`}><ShieldCheck size={14}/> Partner Review</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {myTasks.length === 0 && (
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-portal-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-portal-line">
                  <FileText className="text-portal-muted" size={32} />
                </div>
                <p className="text-portal-muted font-serif text-xl">Your vault is currently empty.</p>
                <p className="text-portal-muted/70 mt-2">Any upcoming engagements will appear here.</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12">
          <h3 className="text-2xl font-serif text-portal-ink mb-6 border-b border-portal-line pb-3">Reference Documents &amp; Guidelines</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REFERENCE_DOCS.map((doc) => (
              <div key={doc.title} className="bg-portal-card p-6 rounded-xl border border-portal-line shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-portal-gold-soft text-portal-gold flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <doc.icon size={22} />
                </div>
                <h4 className="font-semibold text-portal-ink text-sm mb-1">{doc.title}</h4>
                <p className="text-xs text-portal-muted uppercase tracking-widest">PDF Guide</p>
              </div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
