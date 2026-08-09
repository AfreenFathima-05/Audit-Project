import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * Small animated stat tile - the number counts up on mount.
 * Used across every dashboard for consistent, real (non-photo) visuals.
 */
const StatCard = ({ icon: Icon, label, value, suffix = '', accent = 'gold' }) => {
  const numeric = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
  const isNumeric = typeof value === 'number';
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isNumeric) return;
    const controls = animate(count, numeric, { duration: 1, ease: 'easeOut' });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [numeric]);

  const accentClasses = {
    gold: 'bg-gradient-to-br from-amber-50 to-orange-100 border-orange-200 text-orange-900',
    forest: 'bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200 text-emerald-900',
    success: 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 text-teal-900',
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200 text-indigo-900',
    purple: 'bg-gradient-to-br from-purple-50 to-fuchsia-100 border-fuchsia-200 text-fuchsia-900',
  };

  const iconColors = {
    gold: 'text-orange-600',
    forest: 'text-emerald-600',
    success: 'text-teal-600',
    blue: 'text-indigo-600',
    purple: 'text-fuchsia-600',
  };

  const activeAccent = accentClasses[accent] || accentClasses.gold;
  const activeIconColor = iconColors[accent] || iconColors.gold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm min-w-[200px] flex-1 ${activeAccent}`}
    >
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 bg-white/50 backdrop-blur-sm shadow-sm ${activeIconColor}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-widest font-semibold mb-1 opacity-75 truncate">{label}</p>
        <p className="text-2xl font-serif truncate">
          {isNumeric ? display : value}{suffix}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
