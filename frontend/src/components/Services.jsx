import React, { useState } from 'react';
import { siteData } from '../data/siteData';
import { ArrowRight, Download, PhoneCall, ChevronRight, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="py-24 lg:py-32 bg-theme-ivory border-t border-theme-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-serif text-theme-charcoal leading-[1.1] mb-6">
              What We Help <br className="hidden lg:block"/>You With
            </h2>
            <p className="text-theme-charcoal/60 text-lg mb-12">
              A full spectrum of financial services tailored to safeguard your assets and streamline your growth.
            </p>

            {/* Sidebar Widgets */}
            <div className="space-y-8 hidden lg:block sticky top-32">
              
              {/* Quick Nav Widget */}
              <div className="bg-white border border-theme-charcoal/10 p-6 shadow-sm">
                <h4 className="font-serif text-xl mb-4 text-theme-charcoal border-b border-theme-charcoal/10 pb-4">Service Categories</h4>
                <ul className="space-y-3">
                  {siteData.services.map((s, i) => (
                    <li key={i} className="flex items-center text-theme-charcoal/70 hover:text-theme-olive cursor-pointer group">
                      <ChevronRight size={14} className="mr-2 text-theme-bronze opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium transition-transform group-hover:translate-x-1">{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download Brochure Widget */}
              <div className="bg-theme-olive text-theme-ivory p-6">
                <h4 className="font-serif text-xl mb-2">Corporate Brochure</h4>
                <p className="text-sm text-theme-ivory/70 mb-6 font-light">Download our complete guide to financial services and compliance timelines.</p>
                <button className="flex items-center justify-between w-full bg-theme-ivory text-theme-charcoal px-4 py-3 text-sm font-semibold hover:bg-theme-bronze hover:text-theme-ivory transition-colors group">
                  <span>Download PDF</span>
                  <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Contact Expert Widget */}
              <div className="border border-theme-charcoal/10 p-6 flex items-start gap-4 bg-theme-charcoal/5">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-theme-olive flex items-center justify-center">
                  <MessageCircleQuestion size={22} className="text-theme-ivory" />
                </div>
                <div>
                  <h5 className="font-medium text-theme-charcoal text-sm">Need Guidance?</h5>
                  <p className="text-xs text-theme-charcoal/60 mb-2">Speak to a Lead Auditor</p>
                  <Link to="/book-consultation" className="flex items-center text-xs font-semibold text-theme-olive hover:text-theme-bronze transition-colors">
                    <PhoneCall size={12} className="mr-1" />
                    Book Consultation
                  </Link>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="border-t border-theme-charcoal/20">
              {siteData.services.map((service, index) => (
                <div 
                  key={service.id}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 md:py-10 border-b border-theme-charcoal/20 cursor-pointer transition-all duration-500 hover:bg-theme-charcoal/5 px-4 -mx-4"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-start gap-6 lg:gap-12 w-full sm:w-auto">
                    <span className="font-serif text-2xl md:text-3xl text-theme-bronze/70 transition-slow group-hover:text-theme-olive">
                      {service.id}
                    </span>
                    <div className="w-full">
                      <h3 className="text-2xl md:text-3xl text-theme-charcoal font-serif mb-2 transition-slow group-hover:translate-x-2">
                        {service.title}
                      </h3>
                      <div className={`transition-all duration-500 overflow-hidden ${hoveredIndex === index ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 sm:max-h-24 sm:opacity-100 sm:mt-0'}`}>
                        <p className="text-theme-charcoal/70 mb-6 flex-grow leading-relaxed">
                          {service.description}
                        </p>
                        
                        {service.deliverables && (
                          <ul className="mb-8 space-y-2">
                            {service.deliverables.map((item, i) => (
                              <li key={i} className="text-sm text-theme-charcoal/80 flex items-start">
                                <span className="text-theme-bronze mr-2">•</span> {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-auto">
                          <a href="#contact" className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-theme-olive group-hover:text-theme-bronze transition-colors">
                            Explore Service 
                            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block opacity-0 transform -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    <ArrowRight className="text-theme-olive" size={32} strokeWidth={1} />
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

export default Services;
