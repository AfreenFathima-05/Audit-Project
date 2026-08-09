import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Seo, { buildBreadcrumbSchema } from '../../components/Seo';
import { siteData } from '../../data/siteData';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const createSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

const ServiceDetail = () => {
  const { id } = useParams();
  
  const service = siteData.services.find(s => createSlug(s.title) === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const seoBreadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${id}` },
  ]);

  const graphImage = service.id === "01" ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" :
                     service.id === "02" ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop" :
                     service.id === "03" ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" :
                     service.id === "04" ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop" :
                     service.id === "05" ? "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop" :
                     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";

  const documentImage = service.id === "01" ? "/generated_images/audit_assurance_process_doc_1786286447575.png" :
                        service.id === "02" ? "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop" :
                        service.id === "03" ? "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" :
                        service.id === "04" ? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" :
                        service.id === "05" ? "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?q=80&w=2070&auto=format&fit=crop" :
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop";

  const expertiseImage = service.id === "01" ? "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" :
                         service.id === "02" ? "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" :
                         service.id === "03" ? "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" :
                         service.id === "04" ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2070&auto=format&fit=crop" :
                         service.id === "05" ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop" :
                         "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24 pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-30">
        <Link to="/services" className="inline-flex items-center text-theme-stone hover:text-theme-olive transition-colors mb-8 text-sm uppercase tracking-wider font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Services
        </Link>

        {/* Clean Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">Service Detail</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6">{service.title}</h1>
            <p className="text-lg text-theme-charcoal/80 max-w-2xl font-light leading-relaxed">
              {service.description}
            </p>
          </div>
          <div className="h-[350px] w-full rounded-xl overflow-hidden shadow-lg border border-theme-charcoal/10">
            <img 
              src={service.image} 
              alt={service.title} 
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
              <h2 className="text-3xl font-serif text-theme-charcoal mb-6 border-b border-theme-charcoal/20 pb-4">In-Depth Approach</h2>
              <p className="text-theme-charcoal/80 leading-relaxed text-lg">{service.longDescription || service.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-serif text-theme-charcoal mb-8 border-b border-theme-charcoal/20 pb-4">Analytical Insights & Visual Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-2xl border border-theme-charcoal/10 shadow-lg group">
                  <h3 className="text-sm uppercase tracking-widest text-theme-charcoal font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-theme-olive"></span> Sample Analysis Graph
                  </h3>
                  <div className="h-64 bg-theme-charcoal/5 rounded-xl overflow-hidden border border-theme-charcoal/10 relative">
                    <img src={graphImage} alt="Graph" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="mt-4 text-theme-charcoal/70 text-sm">Real-time performance indicators and risk mapping visualization.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-theme-charcoal/10 shadow-lg group">
                  <h3 className="text-sm uppercase tracking-widest text-theme-charcoal font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-theme-bronze"></span> Process Documentation
                  </h3>
                  <div className="h-64 bg-theme-charcoal/5 rounded-xl overflow-hidden border border-theme-charcoal/10 relative">
                    <img src={documentImage} alt="Document" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="mt-4 text-theme-charcoal/70 text-sm">Standardized compliance checklists and structural frameworks.</p>
                </div>
              </div>
              <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl relative group mt-12 border border-theme-charcoal/10">
                 <div className="absolute inset-0 bg-theme-charcoal/60 flex items-center justify-center flex-col text-center p-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-3xl font-serif text-white mb-4">Deep Sector Expertise</h3>
                    <p className="text-white/80 max-w-2xl">We deploy proprietary analytical models to uncover insights that traditional accounting methods simply cannot see.</p>
                 </div>
                 <img src={expertiseImage} alt="Deep Expertise" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>

          </div>

          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-theme-charcoal text-theme-ivory p-10 rounded-xl shadow-xl"
            >
              <h3 className="text-2xl font-serif mb-6 border-b border-white/10 pb-4">Key Deliverables</h3>
              <ul className="space-y-5">
                {service.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 size={20} className="text-theme-bronze mr-4 mt-1 flex-shrink-0" />
                    <span className="text-theme-ivory/80 leading-relaxed font-light">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-theme-ivory/50 mb-6 uppercase tracking-wider font-semibold">Need this service?</p>
                <Link to="/book-consultation" className="block text-center bg-theme-bronze text-theme-ivory py-4 rounded uppercase tracking-widest text-sm font-bold hover:bg-[#A38A66] transition-colors shadow-md">
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
