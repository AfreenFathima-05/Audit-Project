import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { ArrowRight, Clock } from 'lucide-react';

const ResourcesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-24 pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-theme-olive text-xs font-semibold tracking-widest uppercase mb-4 block">Insights</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-theme-charcoal mb-6">Resources &amp; Insights</h1>
            <p className="text-lg text-theme-charcoal/80 max-w-xl font-light leading-relaxed">
              Practical guidance on audit, taxation, GST and compliance, written for founders and finance teams who need clear answers, not jargon.
            </p>
          </div>
          <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-sm">
            <img
              src="/generated_images/resources_insights_1786111080840.png"
              alt="Resources & Insights"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.insights.map((article, idx) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-theme-ivory border border-theme-charcoal/10 rounded-xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-theme-bronze text-xs font-semibold uppercase tracking-widest">{article.category}</span>
                <h3 className="text-xl font-serif text-theme-charcoal mt-3 mb-3 leading-snug">{article.title}</h3>
                <p className="text-theme-charcoal/70 text-sm leading-relaxed">{article.excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-theme-charcoal/10">
                <span className="flex items-center gap-1.5 text-xs text-theme-charcoal/50 uppercase tracking-widest">
                  <Clock size={12} /> {article.readTime}
                </span>
                <ArrowRight size={16} className="text-theme-olive" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-20 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-theme-charcoal mb-4">Have a specific compliance question?</h2>
        <p className="text-theme-charcoal/70 mb-8">Talk to an auditor directly instead of searching for a generic answer.</p>
        <Link
          to="/book-consultation"
          className="inline-block px-8 py-3.5 text-sm uppercase tracking-widest font-semibold bg-theme-charcoal text-theme-ivory hover:bg-theme-olive transition-colors"
        >
          Book a Consultation
        </Link>
      </div>
    </motion.div>
  );
};

export default ResourcesPage;
