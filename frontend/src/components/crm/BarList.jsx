import React from 'react';
import { motion } from 'framer-motion';

/**
 * Simple animated horizontal bar list for ranked data
 * (e.g. engagements per client). items: [{ label, value }]
 */
const BarList = ({ items, color = 'var(--color-portal-gold)' }) => {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-portal-ink font-medium">{item.label}</span>
            <span className="text-portal-muted">{item.value}</span>
          </div>
          <div className="h-2 rounded-full bg-portal-line overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / max) * 100}%` }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarList;
