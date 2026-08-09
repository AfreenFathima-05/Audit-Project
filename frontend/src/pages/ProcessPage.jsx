import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/Seo';
import { siteData } from '../data/siteData';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const createSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

const ProcessPage = () => {
  const [openIndex, setIndex] = useState(0); 

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24 pt-24"
    >
      <Seo
        title="Our Process"
        description="From consultation to final report delivery — a transparent, step-by-step look at how every engagement is run."
        path="/process"
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
              <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">Methodology</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6"
            >
              Our Process
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-theme-charcoal/80 max-w-xl font-light leading-relaxed"
            >
              A systematic, rigorous approach designed to minimize disruption to your business while maximizing the depth and accuracy of our findings.
            </motion.p>
          </div>
          <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-theme-charcoal/10">
            <img 
              src="/generated_images/our_process_1786111096363.png" 
              alt="Our Process" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="space-y-4 mb-20">
        {siteData.process.map((step, index) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-theme-charcoal/10 bg-theme-ivory rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setIndex(openIndex === index ? -1 : index)}
              className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-theme-olive font-serif text-3xl font-bold">{step.id}</span>
                <h3 className="text-xl font-serif text-theme-charcoal pr-8">{step.title}</h3>
              </div>
              <ChevronDown 
                className={`text-theme-olive transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                size={24} 
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-white"
                >
                  <div className="px-8 pb-8 text-theme-charcoal/80 leading-relaxed border-t border-theme-charcoal/10 pt-6 ml-[5.5rem] flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-2/3">
                      <p className="mb-6 text-theme-charcoal/80">{step.description}</p>
                      <div className="inline-block bg-theme-bronze/10 border border-theme-bronze/30 px-4 py-2 text-xs uppercase tracking-widest text-theme-charcoal font-semibold rounded mb-6">
                        Deliverable: <span className="text-theme-olive">{step.deliverable}</span>
                      </div>
                      <div>
                        <Link 
                          to={`/process/${createSlug(step.title)}`}
                          className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-theme-olive hover:text-theme-bronze transition-colors"
                        >
                          View Detail <ArrowRight size={16} className="ml-2 transform hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                    <div className="md:w-1/3 w-full h-32 rounded-lg overflow-hidden border border-theme-charcoal/10 relative shadow-sm">
                      <img 
                        src={
                          step.id === "01" ? "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" :
                          step.id === "02" ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" :
                          step.id === "03" ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop" :
                          step.id === "04" ? "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=2070&auto=format&fit=crop" :
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                        } 
                        alt="Process Visualization" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <Link to="/contact" className="inline-block bg-theme-olive text-theme-ivory px-10 py-4 uppercase tracking-widest text-sm font-bold hover:bg-theme-charcoal transition-colors shadow-md rounded">
          Begin the Process
        </Link>
      </div>
      </div>
    </motion.div>
  );
};

export default ProcessPage;
