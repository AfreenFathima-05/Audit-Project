import React from 'react';
import { Clock, AlertCircle, FileSearch, CheckCircle2 } from 'lucide-react';

const CONFIG = {
  pending: { label: 'Pending', icon: Clock, cls: 'bg-portal-warning-soft text-portal-warning' },
  in_progress: { label: 'In Progress', icon: AlertCircle, cls: 'bg-portal-gold-soft text-portal-gold' },
  review: { label: 'In Review', icon: FileSearch, cls: 'bg-portal-review-soft text-portal-review' },
  completed: { label: 'Finalized', icon: CheckCircle2, cls: 'bg-portal-success-soft text-portal-success' },
};

const StatusBadge = ({ status, labelOverride }) => {
  const c = CONFIG[status] || CONFIG.pending;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${c.cls}`}>
      <Icon size={12} /> {labelOverride || c.label}
    </span>
  );
};

export default StatusBadge;
