import React, { useState } from 'react';
import { siteData } from '../data/siteData';

const Industries = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  // We map specific images to indices, ensuring no people.
  const industryImages = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", // Manufacturing (Factory interior)
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop", // Retail (Store architecture)
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Tech (Server room / abstract)
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop", // Healthcare (Hospital hallway / sterile)
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop", // Logistics (Warehouse)
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"  // Prof Services (Office meeting room empty)
  ];

  return (
    <section id="industries" className="py-24 lg:py-32 bg-theme-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <h2 className="text-4xl md:text-5xl font-serif text-theme-charcoal mb-16 max-w-2xl leading-[1.2]">
          Experience Across <br />
          <span className="text-theme-olive italic">Diverse Businesses</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Industry List */}
          <div className="order-2 lg:order-1 flex flex-col">
            {siteData.industries.map((industry, index) => (
              <div 
                key={industry.name}
                className={`py-8 cursor-pointer transition-colors duration-300 border-b border-theme-charcoal/20 flex items-start justify-between group
                  ${activeIndustry === index ? 'text-theme-charcoal' : 'text-theme-charcoal/40 hover:text-theme-charcoal/70'}
                `}
                onMouseEnter={() => setActiveIndustry(index)}
              >
                <div className="flex flex-col pr-8">
                  <h3 className="text-2xl md:text-3xl font-serif transition-transform duration-500 group-hover:translate-x-4">
                    {industry.name}
                  </h3>
                  <div className={`transition-all duration-500 overflow-hidden ${activeIndustry === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm tracking-wide text-theme-charcoal/80 leading-relaxed font-light pl-4 md:pl-0">
                      {industry.description}
                    </p>
                  </div>
                </div>
                <div className={`w-8 h-[1px] bg-theme-charcoal transition-all duration-500 mt-4 ${activeIndustry === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </div>
            ))}
          </div>

          {/* Corresponding Visual */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] bg-theme-stone overflow-hidden relative">
              {industryImages.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={siteData.industries[index].name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    activeIndustry === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 border-[12px] border-theme-ivory/10 z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Industries;
