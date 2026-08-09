import React from 'react';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import AuditFeature from '../components/AuditFeature';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

function HomePage() {
  return (
    <>
      <Seo
        title="Premium Audit & Assurance Services"
        description="Statutory audits, tax advisory, GST compliance and financial consulting for growing businesses. Trusted, precise, and built for scale."
        path="/"
      />
      <Hero />
      <IntroSection />
      <AuditFeature />
      <Testimonials />
      <Contact />
    </>
  );
}

export default HomePage;
