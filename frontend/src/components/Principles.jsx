import React from 'react';
import { siteData } from '../data/siteData';

const Principles = () => {
  return (
    <section className="py-24 lg:py-32 bg-theme-olive text-theme-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.2]">
            Precision in the Work.<br />
            <span className="italic text-theme-stone">Clarity in the Advice.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 border-t border-theme-ivory/20 pt-16">
          {siteData.principles.map((principle) => (
            <div key={principle.id} className="group cursor-default">
              <div className="font-serif text-5xl text-theme-stone/30 mb-6 transition-colors duration-500 group-hover:text-theme-ivory">
                {principle.id}
              </div>
              <h3 className="text-2xl font-serif mb-4 pb-4 border-b border-theme-ivory/10">
                {principle.title}
              </h3>
              <p className="text-theme-ivory/70 leading-relaxed font-light">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Principles;
