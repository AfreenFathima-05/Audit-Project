import React from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { siteData } from '../data/siteData';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const createSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

const IndustriesPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24 pt-24"
    >
      <Seo
        title="Industries We Serve"
        description="Specialized audit and compliance expertise across manufacturing, healthcare, retail, IT, construction, banking and more."
        path="/industries"
      />
      {/* Clean Hero Section without blur or dark overlay */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">Sectors</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6"
            >
              Industries We Serve
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-theme-charcoal/80 max-w-xl font-light leading-relaxed"
            >
              Specialized expertise across diverse sectors, ensuring our financial strategies align with your industry's unique regulatory and competitive landscape.
            </motion.p>
          </div>
          <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-theme-charcoal/10">
            <img 
              src="/generated_images/industries_hero_real_1786288045100.png" 
              alt="Industries We Serve" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteData.industries.map((industry, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group block overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-theme-stone/10 h-full flex flex-col"
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src={industry.image} 
                alt={industry.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="p-8 flex flex-col flex-grow bg-white relative z-20">
              <h2 className="text-2xl font-serif text-theme-charcoal mb-3">{industry.name}</h2>
              <div className="mt-auto pt-6">
                <Link 
                  to={`/industries/${createSlug(industry.name)}`}
                  className="inline-flex items-center text-sm uppercase tracking-widest text-theme-olive font-semibold group-hover:text-theme-charcoal transition-colors"
                >
                  View Detail <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.div>
  );
};

export default IndustriesPage;
