import React, { useState, useEffect, useRef } from 'react';
import { siteData } from '../data/siteData';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const isHome = location.pathname === '/';
  // Transparent-over-hero only applies on the homepage, before scrolling.
  // Every other page (and the homepage once scrolled) gets the solid glass bar.
  const isTransparent = false;

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Track scroll position to switch nav styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const createSlug = (text) => text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'About',
      href: '/about/credentials',
      subItems: [
        { name: 'Credentials', href: '/about/credentials' },
        { name: 'Principles', href: '/about/principles' }
      ]
    },
    {
      name: 'Services',
      href: '/services',
      subItems: siteData.services.map(s => ({ name: s.title, href: `/services/${createSlug(s.title)}` }))
    },
    {
      name: 'Industries',
      href: '/industries',
      subItems: siteData.industries.map(i => ({ name: i.name, href: `/industries/${createSlug(i.name)}` }))
    },
    {
      name: 'Process',
      href: '/process',
      subItems: siteData.process.map(p => ({ name: p.title, href: `/process/${createSlug(p.title)}` }))
    },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleMobileNavClick = (name, hasSubItems, e) => {
    if (hasSubItems) {
      e.preventDefault();
      setOpenDropdown(openDropdown === name ? null : name);
    }
  };

  const handleSubItemClick = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const linkColor = isTransparent
    ? 'text-theme-ivory hover:text-theme-bronze'
    : 'text-theme-charcoal hover:text-theme-olive';

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-300 py-4 ${
        isTransparent
          ? 'bg-transparent border-b border-transparent'
          : 'bg-theme-ivory/90 backdrop-blur-md border-b border-theme-charcoal/10 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center justify-center shrink-0 mr-6">
          <Link to="/" className="flex flex-col items-center gap-1 md:gap-1.5 group">
            <div className="w-10 h-10 md:w-11 md:h-11 bg-theme-charcoal rounded-xl flex items-center justify-center shadow-md border border-theme-bronze/20 group-hover:border-theme-bronze/50 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-theme-bronze/20 to-transparent opacity-50"></div>
              <span className="font-serif text-theme-ivory font-bold text-lg md:text-xl tracking-tighter flex items-center relative z-10">
                A<span className="text-theme-bronze font-light italic text-sm md:text-base mx-0.5">&</span>C
              </span>
            </div>
            <div className={`flex flex-col items-center justify-center transition-colors ${isTransparent ? 'text-theme-ivory' : 'text-theme-charcoal'}`}>
              <h1 className="font-serif text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase leading-none mb-0 flex items-center">
                Aurilious
                <span className="text-theme-bronze font-light italic text-[11px] md:text-xs lowercase mx-1">&</span>
                <span className="text-[11px] md:text-xs">Co.</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-6 w-full justify-end">
          <ul className="flex space-x-4 xl:space-x-5">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => item.subItems && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 text-[12px] xl:text-[13px] tracking-wider uppercase transition-colors py-2 whitespace-nowrap ${linkColor}`}
                >
                  {item.name}
                  {item.subItems && <ChevronDown size={14} className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Desktop Dropdown */}
                {item.subItems && (
                  <div
                    className={`absolute top-full left-0 mt-0 w-64 bg-theme-ivory border border-theme-charcoal/10 shadow-lg py-2 z-50 transition-all duration-200 origin-top ${openDropdown === item.name ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
                  >
                    <ul className="flex flex-col">
                      {item.subItems.map((sub, idx) => (
                        <li key={idx}>
                          <Link
                            to={sub.href}
                            onClick={handleSubItemClick}
                            className="block px-4 py-2.5 text-xs text-theme-charcoal uppercase tracking-widest hover:bg-theme-olive/10 hover:text-theme-olive transition-colors"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Premium CTA pair: Book Consultation (primary) + Login (secondary) */}
          <div className="flex items-center gap-4 ml-4">
            <Link
              to="/login"
              className={`whitespace-nowrap px-5 py-2.5 text-xs uppercase tracking-widest font-semibold border transition-colors ${
                isTransparent
                  ? 'border-theme-ivory/50 text-theme-ivory hover:bg-theme-ivory/10'
                  : 'border-theme-charcoal/30 text-theme-charcoal hover:bg-theme-charcoal/5'
              }`}
            >
              Login
            </Link>
            <Link
              to="/book-consultation"
              className="whitespace-nowrap px-7 py-3 text-[13px] uppercase tracking-[0.15em] font-bold transition-all duration-300 bg-theme-bronze text-theme-charcoal hover:bg-[#A38A66] hover:text-white shadow-md hover:shadow-lg rounded-sm"
            >
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className={`lg:hidden transition-colors ${isTransparent ? 'text-theme-ivory' : 'text-theme-charcoal'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-theme-ivory border-b border-theme-charcoal/10 shadow-lg max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col py-4 px-6">
            {navItems.map((item) => (
              <li key={item.name} className="border-b border-theme-charcoal/5">
                <div className="flex justify-between items-center py-3">
                  <Link
                    to={item.href}
                    className="text-theme-charcoal uppercase tracking-widest text-sm"
                    onClick={(e) => {
                      handleSubItemClick();
                    }}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <button
                      onClick={(e) => handleMobileNavClick(item.name, true, e)}
                      className="p-2 text-theme-charcoal"
                    >
                      <ChevronDown size={16} className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.subItems && openDropdown === item.name && (
                  <ul className="pl-4 pb-3 flex flex-col">
                    {item.subItems.map((sub, idx) => (
                      <li key={idx}>
                        <Link
                          to={sub.href}
                          onClick={handleSubItemClick}
                          className="block py-2 text-theme-charcoal/70 uppercase tracking-wider text-xs"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-6 pb-2 flex flex-col gap-3">
              <Link
                to="/login"
                className="block text-center border border-theme-charcoal/30 text-theme-charcoal py-3 uppercase tracking-wider text-sm"
                onClick={handleSubItemClick}
              >
                Login
              </Link>
              <Link
                to="/book-consultation"
                className="block text-center bg-theme-bronze text-theme-charcoal py-3 uppercase tracking-wider text-sm font-semibold"
                onClick={handleSubItemClick}
              >
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

