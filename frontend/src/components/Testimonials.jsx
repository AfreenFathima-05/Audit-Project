import React from 'react';
import { siteData } from '../data/siteData';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-24 lg:py-32 bg-theme-stone text-theme-charcoal overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-bronze/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">
              Trusted by Industry <br className="hidden md:block" />
              <span className="text-theme-bronze italic">Leaders.</span>
            </h2>
            <p className="text-theme-charcoal/80 text-lg font-light leading-relaxed max-w-xl">
              We don't just balance the books; we elevate entire business models. Discover what our partners have achieved with our strategic guidance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {siteData.testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-theme-ivory p-8 lg:p-10 rounded-2xl relative group hover:-translate-y-4 transition-all duration-500 shadow-xl border border-theme-bronze/10 overflow-hidden ${index === 1 ? 'md:translate-y-12' : ''}`}
            >
              {/* Massive background quote mark */}
              <div className="absolute -top-10 -right-6 text-theme-bronze/10 transform rotate-12 pointer-events-none transition-transform group-hover:rotate-6 duration-500">
                <Quote size={180} className="fill-current" />
              </div>

              <div className="mb-10 relative z-10">
                <p className="text-xl font-serif text-theme-charcoal leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-theme-charcoal/10 relative z-10">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-lg border-2 border-theme-ivory overflow-hidden bg-theme-charcoal">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-serif font-bold text-white text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-theme-charcoal tracking-wider text-lg">{testimonial.name}</h4>
                  <p className="text-theme-bronze text-xs uppercase tracking-widest mt-1 font-bold">{testimonial.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
