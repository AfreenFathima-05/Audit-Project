import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo, { buildFaqSchema } from '../components/Seo';
import { siteData } from '../data/siteData';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-16 pt-32"
    >
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about our audit, taxation, GST and compliance services."
        path="/faq"
        schema={buildFaqSchema(siteData.faqs)}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        {/* Clean Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">Information</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-theme-charcoal/80 max-w-xl font-light leading-relaxed">
              Clear answers to common inquiries about our services, process, and the value we bring to your business.
            </p>
          </div>
          <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-sm">
            <img 
              src="/generated_images/faq_image_1786111067800.png" 
              alt="FAQ" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="space-y-4 mb-16">
        {siteData.faqs.map((faq, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-theme-charcoal/10 bg-theme-ivory rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none hover:bg-white transition-colors"
            >
              <h3 className="text-lg font-serif text-theme-charcoal pr-8">{faq.question}</h3>
              <ChevronDown 
                className={`text-theme-olive transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                size={20} 
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-white"
                >
                  <div className="px-8 pb-6 text-theme-charcoal/80 leading-relaxed border-t border-theme-charcoal/10 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="text-center bg-theme-olive/5 rounded-xl p-12 border border-theme-olive/10 shadow-sm">
        <h2 className="text-2xl font-serif text-theme-charcoal mb-4">Still have questions?</h2>
        <p className="text-theme-charcoal/80 mb-8">Our partners are available to discuss your specific requirements in detail.</p>
        <Link to="/contact" className="inline-block bg-theme-olive text-white px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-theme-charcoal transition-colors rounded">
          Contact Us Directly
        </Link>
      </div>
      </div>
    </motion.div>
  );
};

export default FAQPage;
