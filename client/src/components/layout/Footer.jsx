import React from 'react';
import { Link } from 'react-router-dom';
import { CloudSun, Github, Twitter, Linkedin, Youtube, Globe, Instagram, Facebook } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
    className: 'social-icon-github hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20'
  },
  {
    name: 'Twitter (X)',
    href: 'https://twitter.com',
    icon: Twitter,
    className: 'social-icon-twitter hover:text-sky-500 dark:hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
    className: 'social-icon-instagram hover:text-pink-500 dark:hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30'
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: Facebook,
    className: 'social-icon-facebook hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-600/10 hover:border-blue-600/30'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
    className: 'social-icon-linkedin hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30'
  },
  {
    name: 'YouTube Weather Briefs',
    href: 'https://youtube.com',
    icon: Youtube,
    className: 'social-icon-youtube hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'
  }
];

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 mt-auto py-8 px-4 sm:px-6 lg:px-8 bg-slate-950/40 backdrop-blur-xl transition-colors">
      <div className="max-w-[1520px] mx-auto space-y-6">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand & Mission Brief */}
          <Link to="/dashboard" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <CloudSun className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-tight">SkyCast AI</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Live Doppler radar, Open-Meteo data & Gemini meteorological intelligence
              </p>
            </div>
          </Link>

          {/* Dedicated Single Page Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
            <Link
              to="/about"
              className="footer-nav-link hover:text-sky-400 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/terms"
              className="footer-nav-link hover:text-sky-400 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="footer-nav-link hover:text-sky-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="footer-nav-link hover:text-sky-400 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              to="/contact"
              className="px-3 py-1 rounded-xl bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 border border-sky-500/30 transition-all font-bold"
            >
              Contact Us ✉️
            </Link>
          </div>

          {/* Social Media Interactive Icon Badges */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className={`p-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-400 transition-all transform hover:-translate-y-0.5 hover:shadow-md ${s.className}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Attribution & Copyright Line */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 SkyCast Platform. All rights reserved.</p>
          <p className="text-[11px] text-slate-400 text-center sm:text-right">
            Meteorological Data powered by Open-Meteo & Google Gemini AI Engine
          </p>
        </div>
      </div>
    </footer>
  );
};
