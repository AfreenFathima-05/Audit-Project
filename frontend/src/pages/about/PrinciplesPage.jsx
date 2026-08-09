import React from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../../data/siteData';

const PrinciplesPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24 pt-24"
    >
      {/* Clean Hero Section without blur or dark overlay */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">About Firm</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6"
            >
              Our Guiding Principles
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-theme-stone max-w-xl font-light leading-relaxed"
            >
              These four pillars dictate every interaction, every report, and every piece of advice we provide.
            </motion.p>
          </div>
          <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/src/assets/5.png" 
              alt="Principles" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-30">
        <div className="space-y-24">
        {siteData.principles.map((principle, index) => {
          const isEven = index % 2 === 0;
          const imageSrc = index === 0 ? "/src/assets/6.png" :
                           index === 1 ? "/src/assets/7.png" :
                           index === 2 ? "/src/assets/8.png" :
                           "/src/assets/9.png";
                           
          return (
          <motion.div 
            key={principle.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col lg:flex-row items-stretch gap-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}
          >
            {/* Image Side */}
            <div className="lg:w-1/2 relative">
              <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl relative group border border-theme-stone/10">
                <div className="absolute inset-0 bg-theme-charcoal/20 group-hover:bg-theme-charcoal/0 transition-colors duration-700 z-10"></div>
                <img 
                  src={imageSrc} 
                  alt={principle.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
              </div>
              {/* Decorative Number */}
              <div className={`absolute -bottom-10 ${isEven ? '-right-6' : '-left-6'} text-[12rem] font-serif font-bold text-theme-stone/10 pointer-events-none select-none leading-none z-0 hidden lg:block`}>
                {principle.id}
              </div>
            </div>
            
            {/* Text Side */}
            <div className="lg:w-1/2 flex flex-col justify-center py-6 relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-5xl font-serif text-theme-olive mr-6">{principle.id}</span>
                <h2 className="text-3xl md:text-4xl font-serif text-theme-charcoal">
                  {principle.title}
                </h2>
              </div>
              <p className="text-theme-charcoal/80 font-medium mb-6 text-xl border-l-4 border-theme-bronze pl-6 py-2 bg-theme-ivory shadow-sm rounded-r-lg">{principle.description}</p>
              <p className="text-theme-stone text-lg leading-relaxed">
                {principle.longDescription}
              </p>
            </div>
          </motion.div>
        )})}
        </div>
      </div>
    </motion.div>
  );
};

export default PrinciplesPage;
