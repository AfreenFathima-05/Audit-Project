import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { siteData } from '../../data/siteData';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp } from 'lucide-react';

const createSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

const IndustryDetail = () => {
  const { id } = useParams();
  
  const industry = siteData.industries.find(i => createSlug(i.name) === id);

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const graphImage = industry.name === "Manufacturing" ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" :
                     industry.name === "Retail & E-commerce" ? "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1950&auto=format&fit=crop" :
                     industry.name === "Information Technology" ? "/generated_images/it_data_visualization_1786286849917.png" :
                     industry.name === "Healthcare" ? "/generated_images/healthcare_vis_1_1786288015448.png" :
                     industry.name === "Real Estate" ? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" :
                     industry.name === "Professional Services" ? "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" :
                     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";

  const documentImage = industry.name === "Manufacturing" ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop" :
                        industry.name === "Retail & E-commerce" ? "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" :
                        industry.name === "Information Technology" ? "/generated_images/it_infrastructure_1786286875279.png" :
                        industry.name === "Healthcare" ? "/generated_images/healthcare_vis_2_1786288028684.png" :
                        industry.name === "Real Estate" ? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" :
                        industry.name === "Professional Services" ? "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?q=80&w=2070&auto=format&fit=crop" :
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24 pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-30">
        <Link to="/industries" className="inline-flex items-center text-theme-stone hover:text-theme-olive transition-colors mb-8 text-sm uppercase tracking-wider font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Industries
        </Link>

        {/* Clean Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">Industry Expertise</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6">{industry.name}</h1>
            <p className="text-lg text-theme-charcoal/80 max-w-2xl font-light leading-relaxed">
              {industry.description}
            </p>
          </div>
          <div className="h-[350px] w-full rounded-xl overflow-hidden shadow-lg border border-theme-charcoal/10">
            <img 
              src={industry.image} 
              alt={industry.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Case Study Section (Experience Proof) */}
        {industry.caseStudy && (
          <div className="bg-theme-ivory p-10 md:p-14 shadow-sm border border-theme-charcoal/10 rounded-xl mb-16">
            <div className="flex items-center gap-4 mb-10 border-b border-theme-charcoal/20 pb-6">
              <div className="bg-theme-bronze/20 p-3 rounded-full text-theme-bronze">
                <TrendingUp size={28} />
              </div>
              <h2 className="text-3xl font-serif text-theme-charcoal">Experience Proof & Case Study</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              <div className="md:col-span-1">
                <h3 className="text-xs uppercase tracking-widest text-theme-charcoal/70 font-semibold mb-3">The Client</h3>
                <p className="text-theme-charcoal font-serif text-2xl">{industry.caseStudy.client}</p>
              </div>
              
              <div className="md:col-span-2 space-y-10">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-theme-charcoal/70 font-semibold mb-3">The Challenge</h3>
                  <p className="text-theme-charcoal/80 leading-relaxed text-lg">{industry.caseStudy.challenge}</p>
                </div>
                
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-theme-charcoal/70 font-semibold mb-3">Our Solution</h3>
                  <p className="text-theme-charcoal/80 leading-relaxed text-lg">{industry.caseStudy.solution}</p>
                </div>
                
                <div className="bg-theme-ivory p-8 lg:p-12 rounded-2xl border border-theme-charcoal/10 shadow-lg mt-12">
                  <h3 className="text-sm uppercase tracking-widest text-theme-olive font-bold mb-4">The Results & Impact</h3>
                  <p className="text-theme-charcoal font-medium leading-relaxed text-xl md:text-2xl mb-12 font-serif italic border-l-4 border-theme-bronze pl-6">{industry.caseStudy.results}</p>
                  
                  <h4 className="text-sm uppercase tracking-widest text-theme-charcoal/70 font-bold mb-6">Performance Visualization</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-64 rounded-xl bg-theme-charcoal/5 overflow-hidden border border-theme-charcoal/10 group relative shadow-md">
                      <div className="absolute inset-0 bg-theme-charcoal/10 group-hover:bg-theme-charcoal/0 transition-colors z-10"></div>
                      <img src={graphImage} alt="Performance Graph" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="h-64 rounded-xl bg-theme-charcoal/5 overflow-hidden border border-theme-charcoal/10 group relative shadow-md">
                      <div className="absolute inset-0 bg-theme-charcoal/10 group-hover:bg-theme-charcoal/0 transition-colors z-10"></div>
                      <img src={documentImage} alt="Analysis Document" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-serif text-theme-charcoal mb-8">Ready to optimize your {industry.name} operations?</h2>
          <Link to="/book-consultation" className="inline-block bg-theme-olive text-theme-ivory px-10 py-4 uppercase tracking-widest text-sm font-bold hover:bg-theme-charcoal transition-colors shadow-md rounded">
            Schedule an Industry Consultation
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default IndustryDetail;
