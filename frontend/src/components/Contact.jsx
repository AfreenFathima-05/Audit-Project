import React from 'react';
import { siteData } from '../data/siteData';

const Contact = () => {
  return (
    <section id="contact" className="py-0 relative bg-theme-bronze text-theme-ivory border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left: Contact Info */}
        <div className="flex flex-col justify-center px-8 lg:px-20 py-24 lg:py-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-16">
            Let's Start a <br />
            <span className="text-theme-charcoal italic">Conversation.</span>
          </h2>
          
          <div className="space-y-12 max-w-md">
            <div>
              <p className="text-theme-charcoal uppercase tracking-widest text-xs mb-3 font-semibold">Headquarters</p>
              <p className="text-xl md:text-2xl font-light whitespace-pre-line leading-relaxed text-theme-ivory">
                {siteData.contact.address}
              </p>
            </div>
            
            <div>
              <p className="text-theme-charcoal uppercase tracking-widest text-xs mb-3 font-semibold">Direct Line</p>
              <a href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-xl md:text-2xl font-light hover:text-theme-charcoal transition-colors text-theme-ivory">
                {siteData.contact.phone}
              </a>
            </div>
            
            <div>
              <p className="text-theme-charcoal uppercase tracking-widest text-xs mb-3 font-semibold">Electronic Mail</p>
              <a href={`mailto:${siteData.contact.email}`} className="text-xl md:text-2xl font-light hover:text-theme-charcoal transition-colors text-theme-ivory">
                {siteData.contact.email}
              </a>
            </div>
            
            <div className="pt-8 border-t border-white/20">
              <p className="text-theme-charcoal uppercase tracking-widest text-xs mb-3 font-semibold">Operating Hours</p>
              <p className="text-lg font-light text-theme-ivory/90">
                {siteData.contact.businessHours}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Static Image Composition without weird hover */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden bg-theme-charcoal">
          <div className="absolute inset-0 z-10 bg-theme-bronze/30 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" 
            alt="Corporate office building interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-12 left-12 right-12 z-20 p-8 backdrop-blur-md bg-theme-charcoal/80 border border-theme-bronze/30 rounded-xl shadow-2xl">
            <span className="font-serif text-2xl text-theme-ivory mb-2 block">Our Headquarters</span>
            <p className="text-theme-ivory/80 text-sm max-w-sm font-light leading-relaxed">Visit our offices in the Financial District for a confidential consultation regarding your business needs.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
