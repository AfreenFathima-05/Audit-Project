import React from 'react';
import { siteData } from '../data/siteData';

const AboutCredentials = () => {
  return (
    <section className="py-20 lg:py-32 bg-theme-charcoal text-theme-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-serif leading-[1.2] mb-8">
              Professional Expertise,<br />
              <span className="text-theme-olive italic">Built Around Your Business.</span>
            </h2>

            <p className="text-theme-ivory/80 text-lg leading-relaxed mb-12 max-w-xl font-light">
              "{siteData.credentials.philosophy}"
            </p>
            
            <div className="space-y-8 border-l border-theme-ivory/20 pl-6 md:pl-10">
              <div>
                <p className="text-theme-ivory/50 uppercase tracking-widest text-xs mb-2">Lead Advisory</p>
                <p className="text-xl md:text-2xl font-light">{siteData.credentials.name}</p>
              </div>
              
              <div>
                <p className="text-theme-ivory/50 uppercase tracking-widest text-xs mb-2">Core Qualification</p>
                <p className="text-lg text-theme-ivory/90">{siteData.credentials.qualification}</p>
              </div>
              
              <div>
                <p className="text-theme-ivory/50 uppercase tracking-widest text-xs mb-2">Professional Certification</p>
                <p className="text-lg text-theme-ivory/90">{siteData.credentials.certification}</p>
              </div>
              
              <div>
                <p className="text-theme-ivory/50 uppercase tracking-widest text-xs mb-2">Industry Experience</p>
                <p className="text-lg text-theme-ivory/90">{siteData.credentials.experience} of dedicated financial oversight</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="text-[12rem] md:text-[18rem] font-serif leading-none text-theme-ivory/5 select-none absolute -top-10 -left-10 md:-left-20 z-0">
                01
              </div>
              <div className="relative z-10 w-full max-w-sm aspect-[4/5] bg-theme-stone p-2">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Office interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Stats Section */}
        {siteData.credentials.stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-theme-ivory/10">
            {siteData.credentials.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-4xl md:text-5xl font-serif text-theme-olive mb-4">{stat.value}</span>
                <span className="text-theme-ivory/60 uppercase tracking-widest text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutCredentials;
