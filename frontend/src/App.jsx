import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';

// Placeholder imports for new pages
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/services/ServiceDetail';
import IndustriesPage from './pages/IndustriesPage';
import IndustryDetail from './pages/industries/IndustryDetail';
import CredentialsPage from './pages/about/CredentialsPage';
import PrinciplesPage from './pages/about/PrinciplesPage';
import ProcessPage from './pages/ProcessPage';
import ProcessDetail from './pages/process/ProcessDetail';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy-loaded: heavier, less-frequently-visited pages. Keeps the initial
// public-site bundle small; these load on demand when actually navigated to.
const BookConsultationPage = lazy(() => import('./pages/BookConsultationPage'));
const TrackBookingPage = lazy(() => import('./pages/TrackBookingPage'));
const PortalPage = lazy(() => import('./pages/PortalPage'));
const AdminLogin = lazy(() => import('./pages/crm/AdminLogin'));
const JuniorLogin = lazy(() => import('./pages/crm/JuniorLogin'));
const ClientLogin = lazy(() => import('./pages/crm/ClientLogin'));
const AdminDashboard = lazy(() => import('./pages/crm/AdminDashboard'));
const AdminClients = lazy(() => import('./pages/crm/AdminClients'));
const AdminProjects = lazy(() => import('./pages/crm/AdminProjects'));
const AdminReports = lazy(() => import('./pages/crm/AdminReports'));
const AdminDocuments = lazy(() => import('./pages/crm/AdminDocuments'));
const AdminSettings = lazy(() => import('./pages/crm/AdminSettings'));

const JuniorDashboard = lazy(() => import('./pages/crm/JuniorDashboard'));
const JuniorTasks = lazy(() => import('./pages/crm/JuniorTasks'));
const JuniorDocuments = lazy(() => import('./pages/crm/JuniorDocuments'));

const ClientDashboard = lazy(() => import('./pages/crm/ClientDashboard'));
const ClientProjects = lazy(() => import('./pages/crm/ClientProjects'));
const ClientVault = lazy(() => import('./pages/crm/ClientVault'));

const GenericPortalPage = lazy(() => import('./pages/crm/GenericPortalPage'));

const RouteLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-theme-charcoal/15 border-t-theme-olive rounded-full animate-spin" />
  </div>
);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const { pathname } = useLocation();
  const isCrmRoute = pathname.startsWith('/crm') || pathname.startsWith('/login') || pathname.startsWith('/portal');
  
  // Show preloader only on the first initial load
  const [showPreloader, setShowPreloader] = useState(true);

  // Smooth scrolling for anchor links within the same page
  useEffect(() => {
    const handleAnchorClick = function (e) {
      // Only process clicks on actual anchor links that start with #
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
  }, []);

  return (
    <div className="font-sans antialiased text-theme-charcoal bg-theme-ivory selection:bg-theme-bronze selection:text-theme-ivory min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader key="preloader" onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>
      <ScrollToTop />
      {!isCrmRoute && <Navbar />}
      <main className={!isCrmRoute ? "flex-grow pt-24" : "flex-grow"}>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookConsultationPage />} />
          <Route path="/book-consultation" element={<BookConsultationPage />} />
          <Route path="/track-booking" element={<TrackBookingPage />} />
          
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:id" element={<IndustryDetail />} />
          
          <Route path="/about/credentials" element={<CredentialsPage />} />
          <Route path="/about/principles" element={<PrinciplesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/process/:id" element={<ProcessDetail />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* CRM Pages */}
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/login" element={<PortalPage />} />

          <Route path="/crm/admin/login" element={<Navigate to="/portal?role=admin" replace />} />
          <Route path="/login/admin" element={<Navigate to="/portal?role=admin" replace />} />
          <Route path="/crm/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/crm/admin/clients" element={<AdminClients />} />
          <Route path="/crm/admin/projects" element={<AdminProjects />} />
          <Route path="/crm/admin/reports" element={<AdminReports />} />
          <Route path="/crm/admin/documents" element={<AdminDocuments />} />
          <Route path="/crm/admin/settings" element={<AdminSettings />} />
          
          <Route path="/crm/junior/login" element={<Navigate to="/portal?role=junior" replace />} />
          <Route path="/login/junior" element={<Navigate to="/portal?role=junior" replace />} />
          <Route path="/crm/junior/dashboard" element={<JuniorDashboard />} />
          <Route path="/crm/junior/tasks" element={<JuniorTasks />} />
          <Route path="/crm/junior/documents" element={<JuniorDocuments />} />
          
          <Route path="/crm/client/login" element={<Navigate to="/portal?role=client" replace />} />
          <Route path="/login/client" element={<Navigate to="/portal?role=client" replace />} />
          <Route path="/crm/client/dashboard" element={<ClientDashboard />} />
          <Route path="/crm/client/projects" element={<ClientProjects />} />
          <Route path="/crm/client/vault" element={<ClientVault />} />

          {/* 404 -- must stay last */}
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isCrmRoute && <Footer />}
    </div>
  );
}

export default App;
