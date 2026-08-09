import React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { ShieldCheck, Clock, Lock, ArrowRight } from 'lucide-react';

const createSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
const Process = () => {
  return (
    <section id="process" className="py-24 lg:py-32 bg-theme-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sidebar Section */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-theme-charcoal mb-6 leading-[1.1]">
                From First Conversation<br />
                <span className="italic text-theme-olive">to Final Report</span>
              </h2>
              <p className="text-theme-charcoal/60 text-lg mb-8">
                Our established methodology ensures absolute accuracy and deep analytical rigor at every stage.
              </p>
            </div>

            {/* Methodology Highlights */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-theme-olive/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-theme-olive" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-theme-charcoal mb-1">ISO Certified Standard</h4>
                  <p className="text-sm text-theme-charcoal/60">Fully compliant with international auditing frameworks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-theme-olive/10 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-theme-olive" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-theme-charcoal mb-1">Fast Turnaround</h4>
                  <p className="text-sm text-theme-charcoal/60">Optimized processes for minimal business disruption.</p>
                </div>
              </div>
            </div>

            {/* Client Portal Widget */}
            <div className="bg-theme-charcoal p-8 text-theme-ivory shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lock size={64} />
              </div>
              <h4 className="font-serif text-xl mb-2 relative z-10">Secure Client Portal</h4>
              <p className="text-sm text-theme-ivory/60 mb-6 font-light relative z-10">Access your audit files, deliverables, and secure communications.</p>
              <button className="flex items-center text-sm font-semibold uppercase tracking-widest text-theme-olive hover:text-theme-ivory transition-colors relative z-10 group">
                Login to Vault
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="lg:w-2/3 relative">
            {/* Vertical line connecting steps (hidden on small mobile) */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-theme-charcoal/20"></div>

            <div className="space-y-12 md:space-y-20">
              {siteData.process.map((step, index) => (
                <div key={step.id} className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 group">
                  
                  {/* Step Number / Dot */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-theme-ivory border-2 border-theme-olive text-theme-olive font-serif text-xl font-medium transition-colors duration-500 group-hover:bg-theme-olive group-hover:text-theme-ivory shrink-0">
                    {step.id}
                  </div>

                  {/* Content */}
                  <div className="flex-1 border-t border-theme-charcoal/10 pt-6 md:border-none md:pt-0">
                    <h3 className="text-2xl font-serif text-theme-charcoal mb-3 transition-transform duration-500 md:group-hover:translate-x-2">
                      {step.title}
                    </h3>
                    <p className="text-theme-charcoal/70 leading-relaxed max-w-2xl font-light transition-transform duration-500 md:group-hover:translate-x-2 mb-4">
                      {step.description}
                    </p>
                    {step.deliverable && (
                      <div className="inline-flex items-center px-4 py-2 bg-theme-stone text-xs font-semibold uppercase tracking-widest text-theme-charcoal transition-transform duration-500 md:group-hover:translate-x-2 mb-4">
                        <span className="text-theme-olive mr-2">Output:</span> {step.deliverable}
                      </div>
                    )}
                    <div className="block mt-2">
                      <Link 
                        to={`/process/${createSlug(step.title)}`}
                        className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-theme-olive hover:text-theme-bronze transition-transform duration-500 md:group-hover:translate-x-2"
                      >
                        Explore Step <ArrowRight size={16} className="ml-2 transform hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
