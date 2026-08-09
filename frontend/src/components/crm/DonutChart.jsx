import React from 'react';
import { motion } from 'framer-motion';

/**
 * Lightweight animated donut chart, built from real data (no stock
 * imagery). segments: [{ label, value, color }]
 */
const DonutChart = ({ segments, size = 180, strokeWidth = 22 }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  return (
    <div className="flex items-center gap-8 flex-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-portal-line)" strokeWidth={strokeWidth} />
        {segments.map((seg, i) => {
          const fraction = seg.value / total;
          const dash = fraction * circumference;
          const gap = circumference - dash;
          const rotation = (offsetAcc / total) * 360;
          offsetAcc += seg.value;
          return (
            <motion.circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              strokeDasharray={`${dash} ${gap}`}
              style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50% 50%' }}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dash} ${gap}` }}
              transition={{ duration: 1, delay: 0.15 * i, ease: 'easeOut' }}
            />
          );
        })}
      </svg>
      <div className="space-y-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2.5 text-sm">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-portal-muted">{seg.label}</span>
            <span className="font-semibold text-portal-ink">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
