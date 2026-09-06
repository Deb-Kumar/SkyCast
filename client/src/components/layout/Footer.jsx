import React from 'react';
import { Link } from 'react-router-dom';
import { CloudSun, Github, Twitter, Linkedin, Youtube, Instagram, Facebook, ShieldCheck, Mail, Sparkles } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/Deb-Kumar/SkyCast',
    icon: Github,
    className: 'hover:text-white hover:bg-slate-800 hover:border-slate-600'
  },
  {
    name: 'Twitter (X)',
    href: 'https://twitter.com',
    icon: Twitter,
    className: 'hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
    className: 'hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30'
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: Facebook,
    className: 'hover:text-blue-400 hover:bg-blue-600/10 hover:border-blue-600/30'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
    className: 'hover:text-sky-300 hover:bg-sky-600/10 hover:border-sky-500/30'
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: Youtube,
    className: 'hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'
  }
];

const FOOTER_LINKS = [
  { label: 'About Platform', to: '/about' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Cookie Policy', to: '/cookies' }
];

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 mt-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-slate-950/60 backdrop-blur-2xl transition-colors relative z-10">
      <div className="max-w-[1520px] mx-auto space-y-6 sm:space-y-8">
        {/* Main Footer Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Brand & Subtitle */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left flex-shrink-0">
            <Link to="/dashboard" className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 hover:scale-105 transition-transform flex-shrink-0">
              <CloudSun className="w-6 h-6" />
            </Link>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-base font-extrabold text-white tracking-tight">SkyCast AI</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  PRO v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 max-w-sm sm:max-w-none">
                Hyper-local telemetry, Open-Meteo feeds & grounded Gemini AI
              </p>
            </div>
          </div>

          {/* Navigation Links — Responsive Touch-Friendly Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-xl">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-white/10 border border-white/5 hover:border-white/20 text-xs font-semibold text-slate-300 hover:text-sky-300 transition-all shadow-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 text-sky-300 hover:text-white border border-sky-500/40 transition-all text-xs font-bold shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Contact Support</span>
            </Link>
          </div>

          {/* Social Media Interactive Icon Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {SOCIAL_LINKS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className={`w-9 h-9 rounded-xl bg-slate-900/80 border border-white/10 text-slate-400 flex items-center justify-center transition-all transform hover:-translate-y-0.5 hover:shadow-lg ${s.className}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Attribution & System Telemetry Status */}
        <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Operational Sensor Feeds</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} SkyCast Platform</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Powered by Open-Meteo & Google Gemini AI Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

