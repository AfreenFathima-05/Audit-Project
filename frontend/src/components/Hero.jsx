import React from 'react';
import { siteData } from '../data/siteData';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Image - Architectural/Office Building */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-theme-charcoal/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-theme-charcoal/60 via-transparent to-theme-ivory z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
          alt="Auditor reviewing financial charts"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center mb-8">
            <div className="w-8 h-[2px] bg-theme-bronze mr-4"></div>
            <span className="text-theme-bronze uppercase tracking-[0.2em] text-sm font-semibold flex items-center gap-2">
              Audit <ShieldCheck size={14} /> Tax <ShieldCheck size={14} /> GST <ShieldCheck size={14} /> Accounting
            </span>
            <div className="w-8 h-[2px] bg-theme-bronze ml-4"></div>
          </div>

          <h1 className="text-5xl md:text-7xl text-theme-ivory leading-[1.1] mb-8">
            {siteData.tagline.split('. ').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}{i !== arr.length - 1 ? '.' : ''}
                <br />
              </React.Fragment>
            ))}
          </h1>

          <p className="text-theme-ivory/90 text-lg md:text-xl max-w-xl leading-relaxed mb-12 font-normal">
            <span className="text-theme-ivory font-bold text-xl">Professional</span> audit, taxation, GST, accounting and financial advisory services designed to bring clarity, compliance and confidence to your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/book-consultation" className="inline-block bg-theme-bronze text-theme-ivory px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-theme-ivory hover:text-theme-charcoal transition-colors duration-300 text-center">
              Book a Consultation
            </Link>
            <a href="#services" className="inline-block border border-theme-ivory/30 text-theme-ivory px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-theme-ivory/10 transition-colors duration-300 text-center">
              Explore Services
            </a>
          </div>

          <div className="mt-20 pt-8 border-t border-theme-charcoal/20 flex flex-wrap gap-x-8 gap-y-4">
            <p className="text-theme-charcoal/80 text-sm tracking-wide font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="text-theme-bronze" /> Professional financial guidance
            </p>
            <p className="text-theme-charcoal/80 text-sm tracking-wide font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="text-theme-bronze" /> Confidential service
            </p>
            <p className="text-theme-charcoal/80 text-sm tracking-wide font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="text-theme-bronze" /> Business-focused advice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
