import React from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../../data/siteData';
import { Shield, Award, Briefcase, FileCheck } from 'lucide-react';
import img3 from '../../../assets/3.png';
import img4 from '../../../assets/4.png';

const CredentialsPage = () => {
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
              Our Credentials
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-theme-charcoal/80 max-w-xl font-light leading-relaxed"
            >
              Behind every successful client engagement is a foundation of rigorous academic, professional, and ethical standards.
            </motion.p>
          </div>
          <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=2000" 
              alt="Credentials" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-theme-ivory p-10 md:p-16 border border-theme-charcoal/10 shadow-sm rounded-xl relative z-30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Left Column: Stats & Philosophy */}
            <div>
              <h2 className="text-2xl font-serif text-theme-charcoal mb-6 border-b border-theme-charcoal/20 pb-4">Our Philosophy</h2>
              <p className="text-theme-charcoal/80 leading-relaxed text-lg italic border-l-4 border-theme-olive pl-6 bg-white py-4 pr-4 rounded-r-lg shadow-sm">
                "{siteData.credentials.philosophy}"
              </p>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {siteData.credentials.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white border border-theme-charcoal/10 text-theme-charcoal p-6 rounded-lg text-center shadow-sm">
                    <span className="block text-4xl font-serif text-theme-olive mb-2">{stat.value}</span>
                    <span className="text-xs uppercase tracking-widest text-theme-charcoal/70 font-semibold">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Professional Standing */}
            <div>
              <h2 className="text-2xl font-serif text-theme-charcoal mb-6 border-b border-theme-charcoal/20 pb-4">Professional Standing</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-theme-bronze/10 p-3 rounded-full text-theme-bronze">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-theme-charcoal/70 font-semibold mb-1">Firm Name</h3>
                    <p className="text-theme-charcoal text-xl font-medium">{siteData.credentials.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-theme-bronze/10 p-3 rounded-full text-theme-bronze">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-theme-charcoal/70 font-semibold mb-1">Primary Qualification</h3>
                    <p className="text-theme-charcoal text-xl font-medium">{siteData.credentials.qualification}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-theme-bronze/10 p-3 rounded-full text-theme-bronze">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-theme-charcoal/70 font-semibold mb-1">Certifications</h3>
                    <p className="text-theme-charcoal text-xl font-medium">{siteData.credentials.certification}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-theme-bronze/10 p-3 rounded-full text-theme-bronze">
                    <FileCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-theme-charcoal/70 font-semibold mb-1">Collective Experience</h3>
                    <p className="text-theme-charcoal text-xl font-medium">{siteData.credentials.experience}</p>
                  </div>
                </div>
              </div>
              <div className="mt-16 border-t border-theme-charcoal/10 pt-12">
                <h3 className="text-2xl font-serif text-theme-charcoal mb-8 border-b border-theme-charcoal/20 pb-4">Accreditations & Official Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-xl border border-theme-charcoal/20 shadow-sm group hover:shadow-md transition-shadow">
                    <div className="h-48 bg-theme-charcoal/5 rounded overflow-hidden mb-4 relative">
                      <div className="absolute inset-0 bg-theme-charcoal/0 group-hover:bg-theme-charcoal/10 transition-colors z-10"></div>
                      <img src={img3} alt="Certificate 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h4 className="font-semibold text-theme-charcoal text-center text-sm uppercase tracking-widest">ISO 9001:2015</h4>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-theme-charcoal/20 shadow-sm group hover:shadow-md transition-shadow">
                    <div className="h-48 bg-theme-charcoal/5 rounded overflow-hidden mb-4 relative">
                      <div className="absolute inset-0 bg-theme-charcoal/0 group-hover:bg-theme-charcoal/10 transition-colors z-10"></div>
                      <img src={img4} alt="Certificate 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h4 className="font-semibold text-theme-charcoal text-center text-sm uppercase tracking-widest">PCAOB Registered</h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CredentialsPage;
