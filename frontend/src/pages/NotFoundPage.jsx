import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-ivory px-6 text-center">
      <div>
        <p className="font-serif text-8xl md:text-9xl text-theme-charcoal/10 mb-4 select-none">404</p>
        <h1 className="text-2xl md:text-3xl font-serif text-theme-charcoal mb-4">This page doesn't exist</h1>
        <p className="text-theme-charcoal/60 max-w-md mx-auto mb-10 leading-relaxed">
          The page you're looking for may have moved or the link may be outdated. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm uppercase tracking-widest font-semibold bg-theme-charcoal text-theme-ivory hover:bg-theme-olive transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
