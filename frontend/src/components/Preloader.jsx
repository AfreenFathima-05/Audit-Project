import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // Wait slightly longer for the rich animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-theme-charcoal overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Animated Background Orbs for dynamic color */}
      <motion.div 
        className="absolute w-[500px] h-[500px] bg-theme-olive/30 rounded-full blur-[120px]"
        animate={{ 
          x: [0, 100, -100, 0], 
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute w-[400px] h-[400px] bg-theme-bronze/10 rounded-full blur-[100px]"
        animate={{ 
          x: [0, -150, 150, 0], 
          y: [0, 150, -150, 0],
          scale: [1, 0.8, 1.3, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Container */}
      <div className="relative z-10 flex flex-col items-center p-12">
        
        {/* Animated abstract logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div 
            className="w-16 h-16 border-[2px] border-theme-bronze rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(190,154,78,0.15)]"
            animate={{ rotate: 225 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-6 h-6 bg-theme-ivory shadow-[0_0_10px_rgba(248,243,231,0.3)]" 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
          </motion.div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1 
          initial={{ opacity: 0, letterSpacing: "0px" }}
          animate={{ opacity: 1, letterSpacing: "8px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-serif text-theme-ivory uppercase ml-2 text-center drop-shadow-lg"
        >
          Aurilious <span className="italic text-theme-bronze normal-case tracking-normal whitespace-nowrap">& Co.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-theme-sage uppercase tracking-[0.3em] text-sm mt-5 font-light drop-shadow-md"
        >
          Audit & Assurance Excellence
        </motion.p>

        {/* Loading Progress Bar */}
        <motion.div 
          className="mt-12 h-[2px] bg-theme-ivory/10 w-64 relative overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-theme-olive to-theme-bronze shadow-[0_0_10px_rgba(190,154,78,0.3)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
