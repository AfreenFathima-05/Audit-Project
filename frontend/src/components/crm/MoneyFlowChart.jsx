import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

/**
 * "Money in motion" chart - an animated trend line that draws itself in,
 * with a handful of small gold coins that spin and drift upward along
 * the curve to visualise engagement value flowing into the firm.
 * Pure SVG + framer-motion, no chart library, no stock imagery.
 */
const MoneyFlowChart = ({ data, width = 640, height = 220 }) => {
  const padding = 24;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;

  const points = useMemo(() => data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
    return { x, y, ...d };
  }), [data, width, height]);

  const linePath = points.reduce((acc, p, i) => acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`), '');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  // A few coins riding along the line at staggered points
  const coinIdx = points.length > 5
    ? [1, Math.floor(points.length / 2), points.length - 2]
    : [Math.floor(points.length / 2)];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
      <defs>
        <linearGradient id="mf-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-portal-gold)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-portal-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* baseline grid */}
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={padding} x2={width - padding} y1={padding + f * (height - padding * 2)} y2={padding + f * (height - padding * 2)} stroke="var(--color-portal-line)" strokeWidth="1" />
      ))}

      {/* animated fill */}
      <motion.path
        d={areaPath}
        fill="url(#mf-area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* animated line draw-in */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="var(--color-portal-gold)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />

      {/* data point dots */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3.5}
          fill="var(--color-theme-charcoal)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.12 }}
        />
      ))}

      {/* spinning coins drifting along the trend line */}
      {coinIdx.map((idx, k) => {
        const p = points[idx];
        return (
          <motion.g
            key={idx}
            initial={{ opacity: 0, y: p.y + 14 }}
            animate={{ opacity: 1, y: [p.y - 22, p.y - 30, p.y - 22] }}
            transition={{
              opacity: { delay: 0.9 + k * 0.25, duration: 0.4 },
              y: { delay: 0.9 + k * 0.25, duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <motion.g
              style={{ transformOrigin: `${p.x}px ${p.y - 26}px` }}
              animate={{ scaleX: [1, -1, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: k * 0.3 }}
            >
              <circle cx={p.x} cy={p.y - 26} r={9} fill="var(--color-portal-gold)" stroke="var(--color-theme-charcoal)" strokeWidth="1" />
              <text x={p.x} y={p.y - 22.5} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-theme-charcoal)">$</text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* x labels */}
      {points.map((p, i) => (
        (i === 0 || i === points.length - 1 || i === Math.floor(points.length / 2)) && (
          <text key={i} x={p.x} y={height - 4} textAnchor="middle" fontSize="10" fill="var(--color-portal-muted)">{p.label}</text>
        )
      ))}
    </svg>
  );
};

export default MoneyFlowChart;
