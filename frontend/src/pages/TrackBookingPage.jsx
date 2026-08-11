import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2 } from 'lucide-react';

const API_URL = 'https://audit-project-9yo1.onrender.com';

const STAGES = ['Received', 'Under Review', 'Assigned', 'Auditing Started', 'Internal Review', 'Final Report', 'Delivered'];

const TrackBookingPage = () => {
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings/track?bookingId=${encodeURIComponent(bookingId)}&email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking not found');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = result ? STAGES.indexOf(result.trackerStage) : -1;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-theme-ivory">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-theme-olive uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">Booking Tracker</span>
          <h1 className="text-3xl md:text-4xl font-serif text-theme-charcoal mb-4">Track Your Consultation</h1>
          <p className="text-theme-charcoal/70">Enter your Booking ID and the email you submitted with to see your current status.</p>
        </div>

        <form onSubmit={handleSearch} className="bg-white p-8 rounded-xl border border-theme-charcoal/10 shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-theme-charcoal/70 text-sm mb-2 font-medium">Booking ID</label>
              <input required value={bookingId} onChange={(e) => setBookingId(e.target.value)} placeholder="AUD-2026-XXXXX" className="w-full bg-transparent border-b border-theme-charcoal/20 py-2.5 focus:outline-none focus:border-theme-olive" />
            </div>
            <div>
              <label className="block text-theme-charcoal/70 text-sm mb-2 font-medium">Email Address</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" className="w-full bg-transparent border-b border-theme-charcoal/20 py-2.5 focus:outline-none focus:border-theme-olive" />
            </div>
          </div>
          {error && <div className="bg-portal-danger-soft text-portal-danger px-4 py-3 rounded text-sm mb-4">{error}</div>}
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-theme-charcoal text-theme-ivory py-3.5 uppercase tracking-widest text-sm font-medium hover:bg-theme-olive transition-colors disabled:opacity-60">
            <Search size={16} /> {loading ? 'Searching...' : 'Track Booking'}
          </button>
        </form>

        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-xl border border-theme-charcoal/10 shadow-sm">
            <h3 className="text-xl font-serif text-theme-charcoal mb-1">{result.fullName}</h3>
            <p className="text-sm text-theme-charcoal/50 mb-8">Booking ID: {result.bookingId}</p>

            <div className="space-y-0">
              {STAGES.map((stage, idx) => {
                const done = idx <= currentIndex;
                return (
                  <div key={stage} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.08 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          done ? 'bg-portal-success text-white' : 'bg-theme-charcoal/10 text-theme-charcoal/30'
                        }`}
                      >
                        <CheckCircle2 size={16} />
                      </motion.div>
                      {idx < STAGES.length - 1 && (
                        <div className={`w-0.5 flex-1 min-h-[24px] ${idx < currentIndex ? 'bg-portal-success' : 'bg-theme-charcoal/10'}`} />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className={`font-medium ${done ? 'text-theme-charcoal' : 'text-theme-charcoal/40'}`}>{stage}</p>
                      {stage === result.trackerStage && (
                        <p className="text-xs text-portal-success uppercase tracking-widest font-semibold mt-1">Current Stage</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackBookingPage;
