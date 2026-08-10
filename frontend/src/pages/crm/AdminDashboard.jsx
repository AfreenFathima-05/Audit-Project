import React, { useState, useMemo } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Plus, Users, Briefcase, TrendingUp, Coins, ClipboardList, XCircle } from 'lucide-react';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import StatCard from '../../components/crm/StatCard';
import StatusBadge from '../../components/crm/StatusBadge';
import DonutChart from '../../components/crm/DonutChart';
import BarList from '../../components/crm/BarList';
import MoneyFlowChart from '../../components/crm/MoneyFlowChart';

const AdminDashboard = () => {
  const { currentUser, tasks, users, bookings, logout, assignTask, approveReport, rejectReport, approveBooking, rejectBooking } = useCRM();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedJunior, setSelectedJunior] = useState('');
  const [bookingJuniorPicks, setBookingJuniorPicks] = useState({});
  const [bookingActionError, setBookingActionError] = useState('');



  const clients = users.filter(u => u.role === 'client');
  const juniors = users.filter(u => u.role === 'junior');
  const pendingBookings = bookings.filter(b => b.status === 'Pending' || b.status === 'Under Review');

  const handleApproveBooking = async (bookingId) => {
    const juniorId = bookingJuniorPicks[bookingId];
    if (!juniorId) {
      setBookingActionError('Pick an auditor to assign before approving.');
      return;
    }
    setBookingActionError('');
    const result = await approveBooking(bookingId, juniorId);
    if (!result.ok) setBookingActionError(result.message || 'Failed to approve booking');
  };

  const handleRejectBooking = async (bookingId) => {
    const reason = prompt('Optional reason to include in the email to the client:') || '';
    const result = await rejectBooking(bookingId, reason);
    if (!result.ok) setBookingActionError(result.message || 'Failed to reject booking');
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (newTaskTitle && selectedClient && selectedJunior) {
      assignTask(newTaskTitle, selectedClient, selectedJunior);
      setNewTaskTitle('');
      setSelectedClient('');
      setSelectedJunior('');
    }
  };

  const statusCounts = useMemo(() => ({
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  }), [tasks]);

  const juniorWorkload = useMemo(() => (
    juniors.map(j => ({ label: j.name.split(' ')[0], value: tasks.filter(t => t.juniorId === j.id).length }))
  ), [tasks, juniors]);

  // Illustrative billing-momentum trend, driven off a completed-engagement
  // baseline so the shape moves with real activity rather than being static.
  const revenueTrend = useMemo(() => {
    const base = 8 + statusCounts.completed * 3;
    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const wave = [0.6, 0.8, 0.7, 1, 0.9, 1.2];
    return months.map((m, i) => ({ label: m, value: Math.round(base * wave[i]) }));
  }, [statusCounts.completed]);

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/crm/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar
        title="Aurilious & Co. Portal"
        subtitle="Admin Command Center"
        userName={currentUser.name}
        userRole="Senior Partner"
        onLogout={logout}
      />

      <div className="flex flex-1">
        <PortalSidebar role="admin" />
        
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-serif text-portal-ink mb-2">Welcome, {currentUser.name.split(' ')[0]}</h2>
            <p className="text-portal-muted">Firm-wide engagement overview and task management.</p>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
            <StatCard icon={Briefcase} label="Active" value={tasks.length} accent="gold" />
            <StatCard icon={Users} label="Clients" value={clients.length} accent="forest" />
            <StatCard icon={TrendingUp} label="Team" value={juniors.length} accent="blue" />
            <StatCard icon={CheckCircle} label="Done" value={statusCounts.completed} accent="success" />
          </div>
        </motion.div>

        <div className="space-y-10">
          {/* Pending Consultation Requests -- the Booking -> Project workflow */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden">
            <div className="p-6 border-b border-portal-line bg-portal-bg flex items-center justify-between">
              <h3 className="text-lg font-serif text-portal-ink flex items-center gap-2"><ClipboardList className="text-portal-gold" size={18} /> Pending Consultation Requests</h3>
              {pendingBookings.length > 0 && (
                <span className="text-xs bg-portal-gold-soft text-portal-gold px-3 py-1 rounded-full font-semibold">{pendingBookings.length} awaiting review</span>
              )}
            </div>
            {bookingActionError && (
              <div className="bg-portal-danger-soft text-portal-danger px-6 py-3 text-sm">{bookingActionError}</div>
            )}
            <div className="divide-y divide-portal-line">
              {pendingBookings.map((b) => (
                <div key={b.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-portal-ink">{b.fullName} {b.companyName && <span className="text-portal-muted font-normal">— {b.companyName}</span>}</h4>
                    <p className="text-sm text-portal-muted">{b.businessEmail} · {b.mobileNumber}</p>
                    {b.servicesInterestedIn.length > 0 && (
                      <p className="text-xs text-portal-gold">{b.servicesInterestedIn.join(', ')}</p>
                    )}
                    <p className="text-xs text-portal-muted/70">Booking ID: {b.bookingId}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                    <select
                      value={bookingJuniorPicks[b.id] || ''}
                      onChange={(e) => setBookingJuniorPicks((prev) => ({ ...prev, [b.id]: e.target.value }))}
                      className="border border-portal-line p-2.5 rounded-md text-sm bg-portal-bg focus:outline-none focus:border-theme-charcoal"
                    >
                      <option value="">Assign auditor…</option>
                      {juniors.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
                    </select>
                    <button onClick={() => handleApproveBooking(b.id)} className="flex items-center justify-center gap-1.5 bg-portal-success text-white px-4 py-2.5 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm">
                      <CheckCircle size={14} /> Approve & Create Project
                    </button>
                    <button onClick={() => handleRejectBooking(b.id)} className="flex items-center justify-center gap-1.5 bg-portal-danger text-white px-4 py-2.5 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm">
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </div>
              ))}
              {pendingBookings.length === 0 && <div className="p-10 text-center text-portal-muted text-sm">No pending consultation requests.</div>}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Create Task Form */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-portal-card p-8 rounded-xl shadow-sm border border-portal-line">
            <h3 className="text-lg font-serif text-portal-ink mb-6 flex items-center gap-2 border-b border-portal-line pb-4"><Plus className="text-portal-gold" /> Assign New Engagement</h3>

            <form onSubmit={handleAssignTask} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2">Engagement Title</label>
                <input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} required className="w-full border border-portal-line p-3 rounded-md focus:outline-none focus:border-theme-charcoal focus:ring-1 focus:ring-theme-charcoal bg-portal-bg" placeholder="e.g. Q3 Financial Review" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2 flex items-center gap-1"><Users size={12}/> Client</label>
                <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} required className="w-full border border-portal-line p-3 rounded-md focus:outline-none focus:border-theme-charcoal focus:ring-1 focus:ring-theme-charcoal bg-portal-bg">
                  <option value="">Select Client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2 flex items-center gap-1"><Users size={12}/> Auditor</label>
                <select value={selectedJunior} onChange={e => setSelectedJunior(e.target.value)} required className="w-full border border-portal-line p-3 rounded-md focus:outline-none focus:border-theme-charcoal focus:ring-1 focus:ring-theme-charcoal bg-portal-bg">
                  <option value="">Assign To</option>
                  {juniors.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
                </select>
              </div>
              <div className="md:col-span-4 flex justify-end mt-2">
                <button type="submit" className="bg-theme-charcoal text-theme-ivory px-8 py-3 rounded-md text-sm uppercase tracking-widest font-medium hover:bg-theme-olive transition-colors shadow-sm">Dispatch Task</button>
              </div>
            </form>
          </motion.div>

          {/* Money-in-motion trend - animated line draw + drifting coins */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-portal-card p-6 md:p-8 rounded-xl border border-portal-line shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-serif text-portal-ink flex items-center gap-2">
                <Coins size={18} className="text-portal-gold" /> Firm Revenue Momentum
              </h3>
              <span className="text-xs text-portal-muted uppercase tracking-widest">Last 6 months</span>
            </div>
            <p className="text-sm text-portal-muted mb-4">Billing momentum as engagements move from active work to finalized reports.</p>
            <MoneyFlowChart data={revenueTrend} />
          </motion.div>

          {/* Charts row - real data, animated, no stock photos */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-portal-card p-6 rounded-xl border border-portal-line shadow-sm">
              <h3 className="text-lg font-serif text-portal-ink mb-6">Engagements by Status</h3>
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
              <h3 className="text-lg font-serif text-portal-ink mb-6">Workload by Associate</h3>
              {juniorWorkload.length > 0
                ? <BarList items={juniorWorkload} />
                : <p className="text-portal-muted text-sm">No associates on the team yet.</p>}
            </div>
          </motion.div>

          {/* Admin Task List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden">
            <div className="p-6 border-b border-portal-line bg-portal-bg">
              <h3 className="text-lg font-serif text-portal-ink">Engagement Ledger</h3>
            </div>
            <div className="divide-y divide-portal-line">
              {tasks.map(task => {
                const client = users.find(u => u.id === task.clientId);
                const junior = users.find(u => u.id === task.juniorId);
                return (
                  <div key={task.id} className="p-6 hover:bg-portal-bg transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1.5">
                      <h4 className="font-semibold text-portal-ink text-lg">{task.title}</h4>
                      <div className="flex gap-4 text-sm text-portal-muted">
                        <span><strong className="text-portal-ink">Client:</strong> {client?.name}</span>
                        <span><strong className="text-portal-ink">Assigned:</strong> {junior?.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 min-w-[220px]">
                      <StatusBadge status={task.status} />
                      {task.status === 'review' && (
                        <div className="flex gap-2 w-full mt-2">
                          <button onClick={() => approveReport(task.id)} className="flex-1 bg-portal-success text-white px-3 py-2 rounded text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm">Approve</button>
                          <button onClick={() => {
                            const fb = prompt("Enter feedback for revision:");
                            if(fb) rejectReport(task.id, fb);
                          }} className="flex-1 bg-portal-danger text-white px-3 py-2 rounded text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm">Reject</button>
                        </div>
                      )}
                      {task.reportDocument && (
                        <span className="text-xs text-portal-gold flex items-center gap-1 font-medium bg-portal-gold-soft px-2 py-1 rounded">
                          <FileText size={12}/> {task.reportDocument}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
              {tasks.length === 0 && <div className="p-12 text-center text-portal-muted font-serif text-lg">No active engagements.</div>}
            </div>
          </motion.div>
        </div>

            <div className="space-y-10">
              {/* Recent Activity Feed */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-portal-card p-8 rounded-xl shadow-sm border border-portal-line">
                <h3 className="text-lg font-serif text-portal-ink mb-6 flex items-center gap-2 border-b border-portal-line pb-4">
                  <ClipboardList className="text-portal-gold" /> Firm Activity
                </h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-portal-line">
                  {[
                    { title: "Consultation Approved", desc: "For Tech Nova", time: "2 hours ago" },
                    { title: "Report Submitted", desc: "By auditor Sarah", time: "5 hours ago" },
                    { title: "Client Onboarded", desc: "Global Freight", time: "1 day ago" }
                  ].map((act, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-portal-gold-soft text-portal-gold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow"></div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded border border-portal-line bg-portal-bg">
                        <h4 className="font-semibold text-portal-ink text-sm">{act.title}</h4>
                        <p className="text-xs text-portal-muted">{act.desc}</p>
                        <span className="text-[10px] text-portal-muted/60 mt-1 block">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default AdminDashboard;
