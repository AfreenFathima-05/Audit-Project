import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { ShieldCheck, Lock, Award, CheckCircle2, ArrowRight } from 'lucide-react';

const API_URL = 'https://audit-project-9yo1.onrender.com';

const inputClass =
  'w-full bg-transparent border-b border-theme-charcoal/20 py-2.5 focus:outline-none focus:border-theme-olive transition-colors text-theme-charcoal placeholder:text-theme-charcoal/30';
const labelClass = 'block text-theme-charcoal/70 text-sm mb-2 font-medium';

const EMPTY_FORM = {
  fullName: '',
  companyName: '',
  businessEmail: '',
  mobileNumber: '',
  alternateContactNumber: '',
  companyWebsite: '',
  businessAddress: '',
  country: '',
  state: '',
  city: '',
  industry: '',
  natureOfBusiness: '',
  numberOfEmployees: '',
  annualTurnover: '',
  currentAccountingSoftware: '',
  businessRegistrationNumber: '',
  gstNumber: '',
  panNumber: '',
  preferredMode: 'Video Call',
  preferredDate: '',
  preferredTime: '',
  businessGoals: '',
  currentProblems: '',
  expectedOutcome: '',
  servicesInterestedIn: [],
  budgetRange: '',
  supportingDocumentsNote: '',
  additionalNotes: '',
  acceptedTerms: false,
  acceptedPrivacyPolicy: false,
};

const BookConsultationPage = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const updateCheckbox = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.checked }));

  const toggleService = (title) => {
    setForm((f) => ({
      ...f,
      servicesInterestedIn: f.servicesInterestedIn.includes(title)
        ? f.servicesInterestedIn.filter((s) => s !== title)
        : [...f.servicesInterestedIn, title],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        const detail = data.errors ? Object.values(data.errors).join(' · ') : '';
        throw new Error(detail ? `${data.message}: ${detail}` : data.message || 'Something went wrong. Please try again.');
      }
      setConfirmation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-theme-ivory flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-portal-success-soft text-portal-success flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-theme-charcoal mb-4">Request Received</h1>
          <p className="text-theme-charcoal/70 mb-8 leading-relaxed">
            Thank you, {confirmation.fullName.split(' ')[0]}. A senior partner will review your request and reach out to confirm your consultation.
          </p>
          <div className="bg-white border border-theme-charcoal/10 rounded-xl p-6 mb-8 inline-block">
            <p className="text-xs uppercase tracking-widest text-theme-charcoal/50 mb-1">Your Booking ID</p>
            <p className="text-2xl font-serif text-theme-charcoal tracking-wide">{confirmation.bookingId}</p>
          </div>
          <p className="text-sm text-theme-charcoal/50 mb-8">
            Save this ID — use it with your email on the{' '}
            <Link to="/track-booking" className="text-theme-olive underline">
              track booking
            </Link>{' '}
            page to check your status anytime.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3.5 text-sm uppercase tracking-widest font-semibold bg-theme-charcoal text-theme-ivory hover:bg-theme-olive transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-ivory min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-theme-charcoal">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2069"
            alt="Corporate consultation meeting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-charcoal via-theme-charcoal/70 to-theme-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-theme-bronze uppercase tracking-[0.25em] text-xs font-semibold mb-5 block">Book Consultation</span>
          <h1 className="text-4xl md:text-6xl font-serif text-theme-ivory leading-tight mb-6">
            Start With a Conversation, <br className="hidden md:block" /> Not a Sales Pitch.
          </h1>
          <p className="text-theme-ivory/70 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Tell us about your business and we'll match you with the right auditor. Every consultation is confidential and reviewed by a senior partner.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-theme-ivory/80 text-sm">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-theme-bronze" /> Confidential by default</span>
            <span className="flex items-center gap-2"><Award size={16} className="text-theme-bronze" /> Senior partner review</span>
            <span className="flex items-center gap-2"><Lock size={16} className="text-theme-bronze" /> Data stored securely</span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-14 rounded-xl border border-theme-charcoal/10 shadow-sm space-y-14">
            {error && <div className="bg-portal-danger-soft text-portal-danger px-4 py-3 rounded text-sm">{error}</div>}

            {/* Contact */}
            <div>
              <h3 className="text-lg font-serif text-theme-charcoal mb-6 pb-3 border-b border-theme-charcoal/10">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div><label className={labelClass}>Full Name *</label><input required className={inputClass} value={form.fullName} onChange={update('fullName')} /></div>
                <div><label className={labelClass}>Company Name</label><input className={inputClass} value={form.companyName} onChange={update('companyName')} /></div>
                <div><label className={labelClass}>Business Email *</label><input type="email" required className={inputClass} value={form.businessEmail} onChange={update('businessEmail')} /></div>
                <div><label className={labelClass}>Mobile Number *</label><input required className={inputClass} value={form.mobileNumber} onChange={update('mobileNumber')} /></div>
                <div><label className={labelClass}>Alternative Contact Number</label><input className={inputClass} value={form.alternateContactNumber} onChange={update('alternateContactNumber')} /></div>
                <div><label className={labelClass}>Company Website</label><input className={inputClass} value={form.companyWebsite} onChange={update('companyWebsite')} /></div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-serif text-theme-charcoal mb-6 pb-3 border-b border-theme-charcoal/10">Business Address</h3>
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div><label className={labelClass}>Business Address</label><input className={inputClass} value={form.businessAddress} onChange={update('businessAddress')} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <div><label className={labelClass}>Country</label><input className={inputClass} value={form.country} onChange={update('country')} /></div>
                <div><label className={labelClass}>State</label><input className={inputClass} value={form.state} onChange={update('state')} /></div>
                <div><label className={labelClass}>City</label><input className={inputClass} value={form.city} onChange={update('city')} /></div>
              </div>
            </div>

            {/* Business profile */}
            <div>
              <h3 className="text-lg font-serif text-theme-charcoal mb-6 pb-3 border-b border-theme-charcoal/10">Business Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div><label className={labelClass}>Industry</label><input className={inputClass} value={form.industry} onChange={update('industry')} /></div>
                <div><label className={labelClass}>Nature of Business</label><input className={inputClass} value={form.natureOfBusiness} onChange={update('natureOfBusiness')} /></div>
                <div><label className={labelClass}>Number of Employees</label><input className={inputClass} value={form.numberOfEmployees} onChange={update('numberOfEmployees')} /></div>
                <div><label className={labelClass}>Annual Turnover</label><input className={inputClass} value={form.annualTurnover} onChange={update('annualTurnover')} /></div>
                <div><label className={labelClass}>Current Accounting Software</label><input className={inputClass} value={form.currentAccountingSoftware} onChange={update('currentAccountingSoftware')} /></div>
                <div><label className={labelClass}>Business Registration Number</label><input className={inputClass} value={form.businessRegistrationNumber} onChange={update('businessRegistrationNumber')} /></div>
                <div><label className={labelClass}>GST Number (Optional)</label><input className={inputClass} value={form.gstNumber} onChange={update('gstNumber')} /></div>
                <div><label className={labelClass}>PAN Number (Optional)</label><input className={inputClass} value={form.panNumber} onChange={update('panNumber')} /></div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-serif text-theme-charcoal mb-6 pb-3 border-b border-theme-charcoal/10">Consultation Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <div>
                  <label className={labelClass}>Preferred Mode</label>
                  <select className={inputClass} value={form.preferredMode} onChange={update('preferredMode')}>
                    <option>Video Call</option>
                    <option>Online</option>
                    <option>Offline</option>
                  </select>
                </div>
                <div><label className={labelClass}>Preferred Date</label><input type="date" className={inputClass} value={form.preferredDate} onChange={update('preferredDate')} /></div>
                <div><label className={labelClass}>Preferred Time</label><input type="time" className={inputClass} value={form.preferredTime} onChange={update('preferredTime')} /></div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-serif text-theme-charcoal mb-6 pb-3 border-b border-theme-charcoal/10">Services Interested In</h3>
              <div className="flex flex-wrap gap-3">
                {siteData.services.map((s) => {
                  const active = form.servicesInterestedIn.includes(s.title);
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => toggleService(s.title)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-full transition-colors ${
                        active
                          ? 'bg-theme-charcoal text-theme-ivory border-theme-charcoal'
                          : 'text-theme-charcoal/70 border-theme-charcoal/20 hover:border-theme-olive'
                      }`}
                    >
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-serif text-theme-charcoal mb-6 pb-3 border-b border-theme-charcoal/10">Your Requirements</h3>
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div><label className={labelClass}>Business Goals</label><textarea rows="2" className={inputClass + ' resize-none'} value={form.businessGoals} onChange={update('businessGoals')} /></div>
                <div><label className={labelClass}>Current Problems</label><textarea rows="2" className={inputClass + ' resize-none'} value={form.currentProblems} onChange={update('currentProblems')} /></div>
                <div><label className={labelClass}>Expected Outcome</label><textarea rows="2" className={inputClass + ' resize-none'} value={form.expectedOutcome} onChange={update('expectedOutcome')} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className={labelClass}>Budget Range</label>
                  <select className={inputClass} value={form.budgetRange} onChange={update('budgetRange')}>
                    <option value="">Select a range</option>
                    <option>Under ₹50,000</option>
                    <option>₹50,000 – ₹2,00,000</option>
                    <option>₹2,00,000 – ₹5,00,000</option>
                    <option>Above ₹5,00,000</option>
                  </select>
                </div>
                <div><label className={labelClass}>Supporting Documents (reference / note)</label><input className={inputClass} placeholder="e.g. Will email separately" value={form.supportingDocumentsNote} onChange={update('supportingDocumentsNote')} /></div>
              </div>
              <div className="mt-6">
                <label className={labelClass}>Additional Notes</label>
                <textarea rows="3" className={inputClass + ' resize-none'} value={form.additionalNotes} onChange={update('additionalNotes')} />
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 text-sm text-theme-charcoal/70 cursor-pointer">
                <input type="checkbox" required className="mt-1" checked={form.acceptedTerms} onChange={updateCheckbox('acceptedTerms')} />
                I agree to the Terms &amp; Conditions.
              </label>
              <label className="flex items-start gap-3 text-sm text-theme-charcoal/70 cursor-pointer">
                <input type="checkbox" required className="mt-1" checked={form.acceptedPrivacyPolicy} onChange={updateCheckbox('acceptedPrivacyPolicy')} />
                I agree to the Privacy Policy and consent to my data being stored securely.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-theme-charcoal text-theme-ivory py-4 uppercase tracking-widest text-sm font-medium hover:bg-theme-olive transition-colors duration-300 disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit Consultation Request'} <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookConsultationPage;
