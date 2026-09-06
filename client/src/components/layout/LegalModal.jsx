import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Cookie,
  Info,
  Mail,
  Send,
  Loader2,
  Check,
  AlertCircle,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { contactAPI } from '../../services/api';

export const LegalModal = ({ isOpen, onClose, initialTab = 'about' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setLoading(true);
    try {
      const res = await contactAPI.submit(formData);
      if (res.data?.success) {
        setSuccessMsg(res.data.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(res.data?.message || 'Failed to submit message.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Unable to submit your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navTabs = [
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
    { id: 'contact', label: 'Contact Us', icon: Mail }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 flex flex-col max-h-[88vh] border border-white/15 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">SkyCast Platform Governance</h2>
              <p className="text-xs text-slate-400">Meteorological compliance, trust, and communication</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 py-3 border-b border-white/10 overflow-x-auto scrollbar-none">
          {navTabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                  active
                    ? 'bg-sky-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed scrollbar-thin">
          {/* 1. ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-200 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  About SkyCast AI Meteorological Platform
                </h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  SkyCast is a next-generation meteorological operating system that synthesizes live global Doppler radar, Open-Meteo satellite arrays, high-resolution sensor telemetry, and Google Gemini AI reasoning to deliver accurate weather insights and early severe storm warnings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                  <h4 className="text-xs font-bold text-white">Hyper-Local Geocoding</h4>
                  <p className="text-[11px] text-slate-400">
                    Pinpoint municipality and neighborhood precision (e.g. Barasat, Salt Lake, New Town) via multi-tiered reverse geocoding engines.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                  <h4 className="text-xs font-bold text-white">Grounded AI Analysis</h4>
                  <p className="text-[11px] text-slate-400">
                    Zero-hallucination Gemini models providing context-injected clothing advice, sporting suitability, and travel safety briefings.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                  <h4 className="text-xs font-bold text-white">Global Air Quality Monitor</h4>
                  <p className="text-[11px] text-slate-400">
                    Comprehensive pollutant indexes for PM2.5, PM10, NO₂, CO, and O₃ paired with targeted health advisories.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                  <h4 className="text-xs font-bold text-white">Live Precipitation Doppler</h4>
                  <p className="text-[11px] text-slate-400">
                    Real-time radar overlays and rain trajectory forecasting with sub-kilometer visual resolution.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-white">1. Acceptance of Terms</h3>
              <p>
                By accessing or utilizing the SkyCast platform, you agree to be legally bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>

              <h3 className="text-sm font-bold text-white">2. Meteorological Data & Forecast Accuracy</h3>
              <p>
                Meteorological data is aggregated in real-time from Open-Meteo, satellite feeds, and municipal telemetry. While SkyCast employs advanced algorithmic refinement, atmospheric forecasts are inherently probabilistic and should not replace official emergency mandates during extreme natural catastrophes.
              </p>

              <h3 className="text-sm font-bold text-white">3. Platform Use & Account Security</h3>
              <p>
                Users are responsible for safeguarding their login credentials and ensuring authorized access. Any automated data scraping or reverse-engineering of API endpoints without written consent is strictly prohibited.
              </p>
            </div>
          )}

          {/* 3. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-white">1. Information We Collect</h3>
              <p>
                SkyCast collects geolocation coordinates (latitude/longitude) only when explicitly approved through your browser's "Auto Locate" feature to deliver local weather feeds. We do not track, log, or sell individual location histories.
              </p>

              <h3 className="text-sm font-bold text-white">2. Account Credentials & Security</h3>
              <p>
                User passwords are cryptographic one-way hashed using bcrypt. We never store plaintext passwords, and authentication tokens are secured with HTTP-only tokens.
              </p>

              <h3 className="text-sm font-bold text-white">3. Third-Party Meteorological Services</h3>
              <p>
                API requests to Open-Meteo, RainViewer, and BigDataCloud transmit solely anonymized coordinate vectors to retrieve meteorological layers.
              </p>
            </div>
          )}

          {/* 4. COOKIE POLICY */}
          {activeTab === 'cookies' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-white">1. How We Use Cookies</h3>
              <p>
                SkyCast uses essential local storage keys and session cookies to persist your preferred measurement units (°C/°F, km/h/mph), dark/daylight theming settings, and active municipality selections.
              </p>

              <h3 className="text-sm font-bold text-white">2. Cookie Categories</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Strictly Necessary Cookies:</strong> Used for secure session authentication and API rate limiting protection.</li>
                <li><strong className="text-white">Preference Keys (localStorage):</strong> Stores your chosen meteorological scales and theme state across page reloads.</li>
              </ul>
            </div>
          )}

          {/* 5. CONTACT US FORM */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-white">Get in Touch with the SkyCast Team</h3>
                <p className="text-xs text-slate-400">
                  Have a question, feedback, or meteorological inquiry? Send us a message and our team will get back to you promptly.
                </p>
              </div>

              {successMsg && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" /> {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-3.5 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Deb Kumar"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Subject / Category</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Weather Forecast Inquiry, API feedback, Bug report"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your inquiry or feedback here..."
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-sky-500/25 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Submitting Message...' : 'Send Message to SkyCast Team'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
