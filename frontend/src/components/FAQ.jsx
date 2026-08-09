import React, { useState } from 'react';
import { siteData } from '../data/siteData';
import { Plus, Minus, Mail, Phone, FileText, ExternalLink } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 bg-theme-stone/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* FAQ Accordion Main Content */}
          <div className="lg:w-2/3">
            <h2 className="text-4xl md:text-5xl font-serif text-theme-charcoal mb-12">
              Frequently Asked Questions
            </h2>

            <div className="border-t border-theme-charcoal/20">
              {siteData.faqs.map((faq, index) => (
                <div key={index} className="border-b border-theme-charcoal/20">
                  <button 
                    className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className={`text-xl font-serif pr-8 transition-colors duration-300 ${openIndex === index ? 'text-theme-olive' : 'text-theme-charcoal group-hover:text-theme-olive'}`}>
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-10 h-10 rounded-full border border-theme-charcoal/10 flex items-center justify-center text-theme-charcoal group-hover:border-theme-olive group-hover:text-theme-olive transition-colors">
                      {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  
                  <div className={`transition-all duration-500 overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100 pb-8' : 'max-h-0 opacity-0 pb-0'}`}>
                    <p className="text-theme-charcoal/70 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:w-1/3 space-y-8 lg:pt-24">
            
            {/* Support Info */}
            <div className="bg-theme-ivory border border-theme-charcoal/10 p-8 shadow-sm">
              <h4 className="font-serif text-xl mb-6 text-theme-charcoal">Direct Support</h4>
              <p className="text-sm text-theme-charcoal/70 mb-6 leading-relaxed">Have a specific or urgent inquiry? Our partners are available for priority consultations.</p>
              
              <div className="space-y-4">
                <a href={`mailto:${siteData.contact.email}`} className="flex items-center text-sm font-semibold text-theme-charcoal hover:text-theme-olive transition-colors group">
                  <div className="w-8 h-8 rounded bg-theme-charcoal/5 flex items-center justify-center mr-3 group-hover:bg-theme-olive/10 transition-colors">
                    <Mail size={16} className="text-theme-olive" />
                  </div>
                  {siteData.contact.email}
                </a>
                <a href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center text-sm font-semibold text-theme-charcoal hover:text-theme-olive transition-colors group">
                  <div className="w-8 h-8 rounded bg-theme-charcoal/5 flex items-center justify-center mr-3 group-hover:bg-theme-olive/10 transition-colors">
                    <Phone size={16} className="text-theme-olive" />
                  </div>
                  {siteData.contact.phone}
                </a>
              </div>
            </div>

            {/* Resource Links */}
            <div className="bg-theme-charcoal p-8 text-theme-ivory shadow-sm">
              <h4 className="font-serif text-xl mb-6">Tax Resources</h4>
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm text-theme-ivory/70 hover:text-theme-ivory cursor-pointer transition-colors group border-b border-theme-ivory/10 pb-3">
                  <span className="flex items-center"><FileText size={16} className="mr-2 opacity-60" /> Current Tax Deadlines</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
                <li className="flex items-center justify-between text-sm text-theme-ivory/70 hover:text-theme-ivory cursor-pointer transition-colors group border-b border-theme-ivory/10 pb-3">
                  <span className="flex items-center"><FileText size={16} className="mr-2 opacity-60" /> GST Calculator Tool</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
                <li className="flex items-center justify-between text-sm text-theme-ivory/70 hover:text-theme-ivory cursor-pointer transition-colors group">
                  <span className="flex items-center"><FileText size={16} className="mr-2 opacity-60" /> Internal Audit Checklist</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
