import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AuditFeature = () => {
  return (
    <section className="py-0 relative bg-theme-ivory">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left: Image side */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
            alt="Financial audit documents and data" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text side */}
        <div className="flex flex-col justify-center px-8 lg:px-20 py-24 lg:py-32 text-theme-charcoal relative z-20">
          <div className="absolute top-0 right-12 w-[1px] h-32 bg-theme-charcoal/10 hidden lg:block"></div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-10">
            An Audit Should Do More<br />
            <span className="text-theme-bronze italic">Than Check the Numbers.</span>
          </h2>
          
          <p className="text-theme-charcoal/80 text-lg leading-relaxed mb-12 max-w-xl">
            We don't just verify transactions; we evaluate the underlying mechanics of your business. Our comprehensive audit methodology is designed to uncover inefficiencies, strengthen internal controls, and provide a transparent view of your true financial position.
          </p>

          <ul className="space-y-8 max-w-lg">
            {[
              {
                title: "Ensure Financial Accuracy",
                desc: "We rigorously verify all financial statements to ensure complete compliance with international accounting standards."
              },
              {
                title: "Identify Vulnerabilities",
                desc: "Our deep-dive analysis uncovers hidden risks within your internal controls before they become costly liabilities."
              },
              {
                title: "Highlight Inefficiencies",
                desc: "We pinpoint structural bottlenecks in your operations, providing actionable strategies to streamline your financial workflow."
              },
              {
                title: "Deliver Actionable Visibility",
                desc: "Beyond raw data, we provide crystal-clear insights that empower management to make confident, strategic decisions."
              }
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-5">
                <CheckCircle2 size={28} className="text-theme-bronze shrink-0 mt-1" fill="currentColor" stroke="white" />
                <div>
                  <h4 className="text-theme-charcoal font-serif text-xl mb-1">{item.title}</h4>
                  <p className="text-theme-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default AuditFeature;
