import React from 'react';
import { siteData } from '../data/siteData';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-theme-charcoal text-theme-ivory pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Col */}
          <div className="pr-0 lg:pr-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center p-1 shadow-sm overflow-hidden">
                <img src="/aurilious_logo.png" alt="Aurilious Logo" className="w-full h-full object-cover" />
              </div>
              <Link to="/" className="font-serif font-semibold text-xl tracking-wide text-theme-ivory flex items-center gap-1">
                <span>Aurilious</span>
              </Link>
            </div>
            <p className="text-theme-stone text-sm leading-relaxed mb-8 max-w-sm">
              Professional audit, taxation, and financial advisory services designed to bring clarity and confidence to your business. We serve as your elite strategic partner.
            </p>
            
            <div>
              <h4 className="text-theme-ivory uppercase tracking-widest text-xs font-semibold mb-4">Subscribe to Insights</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/5 text-theme-ivory px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-theme-bronze border border-white/10 border-r-0 w-full max-w-[250px]"
                />
                <button className="bg-theme-bronze text-theme-ivory px-4 py-3 text-sm font-semibold hover:bg-[#A38A66] transition-colors border border-theme-bronze">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:pl-12 lg:border-l border-white/10 flex flex-col justify-center">
            <h4 className="text-theme-ivory uppercase tracking-widest text-xs font-semibold mb-6">Contact & Headquarters</h4>
            <div className="flex items-start gap-4 mb-4">
              <MapPin size={20} className="text-theme-bronze shrink-0 mt-1" />
              <p className="text-sm text-theme-stone whitespace-pre-line leading-relaxed">{siteData.contact.address}</p>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Phone size={20} className="text-theme-bronze shrink-0" />
              <a href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-sm text-theme-stone hover:text-theme-ivory transition-colors">{siteData.contact.phone}</a>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Mail size={20} className="text-theme-bronze shrink-0" />
              <a href={`mailto:${siteData.contact.email}`} className="text-sm text-theme-stone hover:text-theme-ivory transition-colors">{siteData.contact.email}</a>
            </div>
            
            <div className="pt-6 border-t border-white/10 mt-2">
              <span className="block text-theme-ivory/50 uppercase tracking-widest text-[10px] mb-2">Business Hours</span>
              <p className="text-sm text-theme-stone">{siteData.contact.businessHours}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-theme-stone/50">
          <p>&copy; {new Date().getFullYear()} {siteData.firmName}. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-theme-ivory transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-theme-ivory transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
