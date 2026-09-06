import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import {
  Mail,
  Send,
  Loader2,
  Check,
  AlertCircle,
  Sparkles,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  ShieldCheck,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Instagram,
  Facebook
} from 'lucide-react';
import { contactAPI } from '../services/api';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all required fields (Name, Email, Subject, Message).');
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

  return (
    <PageWrapper>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            24/7 Support & Meteorological Inquiry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">SkyCast Team</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Have a question, feedback, API collaboration request, or bug report? Send us a message and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Details & Metadata */}
          <div className="space-y-4">
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                Contact Channels
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-white/5">
                  <Mail className="w-4 h-4 text-sky-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Direct Email</p>
                    <p className="text-slate-400">support@skycast.ai</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-white/5">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Headquarters</p>
                    <p className="text-slate-400">Barasat, West Bengal, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-white/5">
                  <Clock className="w-4 h-4 text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Response Time</p>
                    <p className="text-slate-400">Under 2 hours for urgent storm reports</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/10">
                <p className="text-[11px] font-semibold text-slate-400 mb-2">Connect Across Networks</p>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { name: 'GitHub', href: 'https://github.com', icon: Github, className: 'social-icon-github hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20' },
                    { name: 'Twitter (X)', href: 'https://twitter.com', icon: Twitter, className: 'social-icon-twitter hover:text-sky-500 dark:hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30' },
                    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram, className: 'social-icon-instagram hover:text-pink-500 dark:hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30' },
                    { name: 'Facebook', href: 'https://facebook.com', icon: Facebook, className: 'social-icon-facebook hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-600/10 hover:border-blue-600/30' },
                    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin, className: 'social-icon-linkedin hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30' },
                    { name: 'YouTube', href: 'https://youtube.com', icon: Youtube, className: 'social-icon-youtube hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30' }
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.name}
                        className={`p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-400 transition-all ${s.className}`}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-2 bg-gradient-to-br from-indigo-500/10 to-sky-500/10">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise API Access</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need high-throughput weather API streams or customized radar overlays? Inquire via the form for dedicated support tiers.
              </p>
            </div>
          </div>

          {/* Interactive Contact Form Card */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Fill out the details below and we will automatically create a tracked support ticket.
              </p>
            </div>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Deb Kumar"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Subject / Category *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Weather Forecast Inquiry, API feedback, Bug report"
                  className="w-full bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your detailed inquiry or feedback here..."
                  className="w-full bg-slate-900/90 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2"
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
        </div>
      </div>
    </PageWrapper>
  );
};
