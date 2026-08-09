import React from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { siteData } from '../data/siteData';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const createSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

const ServicesPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24 pt-24"
    >
      <Seo
        title="Our Services"
        description="Statutory audit, tax audit, GST services, accounting, financial consulting and compliance advisory — explore every service we offer."
        path="/services"
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
              <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">Practice Areas</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6"
            >
              Our Services
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-theme-charcoal/80 max-w-xl font-light leading-relaxed"
            >
              Comprehensive financial solutions tailored to bring clarity, compliance, and strategic advantage to your business.
            </motion.p>
          </div>
          <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-theme-charcoal/10">
            <img 
              src="/generated_images/service_support_graphic_1786286086031.png" 
              alt="Services" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteData.services.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-theme-stone/10 shadow-sm rounded-xl hover:shadow-xl transition-all group flex flex-col h-full overflow-hidden"
          >
            <div className="h-48 w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-theme-charcoal/20 group-hover:bg-theme-charcoal/10 transition-colors z-10"></div>
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="p-10 flex flex-col flex-grow relative bg-theme-ivory">
              <span className="text-theme-bronze font-serif text-3xl font-bold mb-6 block relative z-10">{service.id}</span>
              <h2 className="text-2xl font-serif text-theme-charcoal mb-4 relative z-10">{service.title}</h2>
              <p className="text-theme-charcoal/80 leading-relaxed mb-10 flex-grow relative z-10">{service.description}</p>
              
              <Link 
                to={`/services/${createSlug(service.title)}`}
                className="inline-flex items-center text-sm uppercase tracking-widest text-theme-charcoal font-semibold group-hover:text-theme-olive transition-colors mt-auto relative z-10 w-fit"
              >
                Explore Service <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;
