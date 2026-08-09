import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IntroSection = () => {
  const features = [
    {
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
      title: "Risk Management",
      desc: "Identifying vulnerabilities before they become liabilities."
    },
    {
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2036&auto=format&fit=crop",
      title: "Tax Optimization",
      desc: "Structuring for maximum efficiency and compliance."
    },
    {
      image: "/src/assets/1.png",
      title: "Statutory Audits",
      desc: "Rigorous verification for complete stakeholder confidence."
    },
    {
      image: "/src/assets/2.png",
      title: "Strategic Growth",
      desc: "Data-driven consulting for sustainable expansion."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div>
            <span className="text-theme-olive text-sm font-semibold tracking-widest uppercase mb-4 block">The Aurilious Standard</span>
            <h2 className="text-4xl md:text-5xl font-serif text-theme-charcoal leading-tight mb-6">
              More than accountants. We are your <span className="italic text-theme-olive">financial architects.</span>
            </h2>
            <p className="text-theme-stone text-lg leading-relaxed mb-8">
              In an increasingly complex regulatory environment, traditional bookkeeping is no longer enough. We engineer robust financial frameworks that protect your assets, ensure impeccable compliance, and provide the clarity needed to make bold business decisions.
            </p>
            <Link to="/about/credentials" className="inline-flex items-center text-sm uppercase tracking-widest text-theme-charcoal font-semibold hover:text-theme-olive transition-colors group">
              Explore Our Credentials <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-theme-ivory border border-theme-charcoal/5 hover:border-theme-olive/30 transition-all duration-300 group rounded-xl overflow-hidden shadow-sm hover:shadow-md">
                <div className="h-40 w-full overflow-hidden">
                  <img src={feat.image} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-theme-charcoal mb-2">{feat.title}</h3>
                  <p className="text-theme-stone text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
