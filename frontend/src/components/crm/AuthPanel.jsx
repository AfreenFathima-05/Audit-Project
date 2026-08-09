import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

/**
 * Shared branding panel for every portal login screen.
 * Deliberately illustration-based (no stock photography, no AI art) -
 * a slow, layered arrangement of arcs and a badge icon in the brand's
 * forest + gold palette, consistent across Admin / Junior / Client.
 */
const AuthPanel = ({ eyebrow, title, highlight, description, features = [], Icon }) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-theme-charcoal text-theme-ivory overflow-hidden flex-col justify-between p-12">
      {/* Ambient illustrated backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-theme-charcoal via-portal-forest to-theme-charcoal" />
        {[420, 300, 190].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-theme-bronze/20"
            style={{
              width: size,
              height: size,
              top: `calc(50% - ${size / 2}px)`,
              left: `calc(50% - ${size / 2}px)`,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.95, 1, 0.95] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-theme-charcoal via-theme-charcoal/40 to-transparent" />
      </div>

      <div className="relative z-20">
        <Link to="/portal" className="inline-flex items-center text-theme-ivory/60 hover:text-theme-ivory mb-12 transition-colors text-sm uppercase tracking-widest">
          <ChevronLeft size={18} className="mr-1" /> Back to Portal
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-16 h-16 rounded-2xl bg-theme-bronze/15 border border-theme-bronze/40 flex items-center justify-center mb-8"
        >
          {Icon && <Icon size={28} className="text-theme-bronze" />}
        </motion.div>

        <span className="text-theme-bronze uppercase tracking-[0.25em] text-xs font-semibold mb-4 block">{eyebrow}</span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl xl:text-5xl font-serif leading-tight mb-6"
        >
          {title} <br /><span className="text-theme-bronze italic">{highlight}</span>
        </motion.h1>
        <p className="text-theme-ivory/70 text-lg max-w-md leading-relaxed">{description}</p>
      </div>

      <div className="relative z-20 mt-12 grid grid-cols-1 gap-6">
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-theme-bronze/15 flex items-center justify-center shrink-0 border border-theme-bronze/40">
              <f.icon size={18} className="text-theme-bronze" />
            </div>
            <div>
              <h4 className="font-semibold text-lg font-serif">{f.title}</h4>
              <p className="text-theme-ivory/60 text-sm">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AuthPanel;
