import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { siteData } from '../../data/siteData';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const createSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

const ProcessDetail = () => {
  const { id } = useParams();
  
  const process = siteData.process.find(p => createSlug(p.title) === id);

  if (!process) {
    return <Navigate to="/process" replace />;
  }

  // Choose an image based on the process ID
  const processImage = process.id === "01" ? "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" :
                       process.id === "02" ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" :
                       process.id === "03" ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop" :
                       process.id === "04" ? "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=2070&auto=format&fit=crop" :
                       "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop";

  const methodologyImage = process.id === "01" ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" :
                           process.id === "02" ? "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" :
                           process.id === "03" ? "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop" :
                           process.id === "04" ? "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?q=80&w=2070&auto=format&fit=crop" :
                           "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop";
                           
  const qaImage = process.id === "01" ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" :
                  process.id === "02" ? "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" :
                  process.id === "03" ? "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" :
                  process.id === "04" ? "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" :
                  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24 pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-30">
        <Link to="/process" className="inline-flex items-center text-theme-stone hover:text-theme-olive transition-colors mb-8 text-sm uppercase tracking-wider font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Process
        </Link>

        {/* Clean Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">Process Step {process.id}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6">{process.title}</h1>
            <p className="text-lg text-theme-charcoal/80 max-w-2xl font-light leading-relaxed">
              {process.description}
            </p>
          </div>
          <div className="h-[350px] w-full rounded-xl overflow-hidden shadow-lg border border-theme-charcoal/10">
            <img 
              src={processImage} 
              alt={process.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-theme-ivory p-10 md:p-14 border border-theme-charcoal/10 rounded-xl mb-12"
            >
              <h2 className="text-3xl font-serif text-theme-charcoal mb-6 border-b border-theme-charcoal/20 pb-4">Execution Details</h2>
              <p className="text-theme-charcoal/80 leading-relaxed text-lg">
                During this crucial phase of our methodology, our dedicated teams focus entirely on ensuring the highest standards of accuracy and thoroughness. We leverage both our decades of experience and state-of-the-art analytical tools to execute this step flawlessly. Our process is designed to minimize disruption to your daily operations while maximizing the strategic value we extract from your data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-serif text-theme-charcoal mb-8 border-b border-theme-charcoal/20 pb-4">Methodology Visualized</h2>
              <div className="grid grid-cols-1 gap-8 mb-8">
                <div className="bg-white p-8 rounded-2xl border border-theme-charcoal/10 shadow-lg group">
                  <h3 className="text-sm uppercase tracking-widest text-theme-charcoal font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-theme-olive"></span> Flowchart & Framework
                  </h3>
                  <div className="h-[400px] bg-theme-charcoal/5 rounded-xl overflow-hidden border border-theme-charcoal/10 relative">
                    <div className="absolute inset-0 bg-theme-charcoal/10 group-hover:bg-theme-charcoal/0 transition-colors z-10"></div>
                    <img src={methodologyImage} alt="Methodology Graph" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl border border-theme-charcoal/10 shadow-lg group">
                  <h3 className="text-sm uppercase tracking-widest text-theme-charcoal font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-theme-bronze"></span> Quality Assurance Protocols
                  </h3>
                  <div className="h-64 bg-theme-charcoal/5 rounded-xl overflow-hidden border border-theme-charcoal/10 relative">
                    <img src={qaImage} alt="QA Document" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-theme-charcoal text-theme-ivory p-10 rounded-xl shadow-xl sticky top-32"
            >
              <h3 className="text-2xl font-serif mb-6 border-b border-white/10 pb-4">Output & Deliverable</h3>
              
              <div className="bg-theme-bronze/10 border border-theme-bronze/20 p-6 rounded-lg mb-8 text-center">
                 <h4 className="text-theme-bronze text-xs uppercase tracking-widest font-bold mb-2">Primary Output</h4>
                 <p className="text-theme-ivory text-xl font-serif">{process.deliverable}</p>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-theme-ivory/50 mb-6 uppercase tracking-wider font-semibold">Have questions?</p>
                <Link to="/book-consultation" className="block text-center bg-theme-bronze text-theme-ivory py-4 rounded uppercase tracking-widest text-sm font-bold hover:bg-[#A38A66] transition-colors shadow-md">
                  Book a Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessDetail;
