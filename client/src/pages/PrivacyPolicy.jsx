import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ShieldCheck, Lock, EyeOff, Server, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Data Protection & Privacy
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            SkyCast Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Effective Date: September 2026 • Your personal data and location privacy are protected under strict encryption standards.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              1. Geolocation Data Collection & Usage
            </h2>
            <p>
              SkyCast accesses your device's GPS or network-based coordinates solely when you interact with the <strong>"Auto Locate"</strong> or location search features. This data is utilized in real-time to query meteorological feeds for your specific municipality or town.
            </p>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
              <p className="text-xs font-semibold text-white">Our Zero-Tracking Guarantee:</p>
              <p className="text-[11px] text-slate-400">
                We never store historical location breadcrumbs, track user movement routes, or sell telemetry data to third-party advertising networks.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              2. Account Security & Cryptographic Protection
            </h2>
            <p>
              Account passwords are cryptographically hashed using salted bcrypt prior to database insertion. We never store or transmit plaintext passwords. Authentication sessions use JSON Web Tokens (JWT) transmitted over secure HTTP-only cookies.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-400" />
              3. AI Inquiries & Meteorological Context
            </h2>
            <p>
              When utilizing the SkyCast Grounded AI Assistant, user prompts and anonymized weather parameters (e.g. current temperature, rain likelihood) are processed via Google Gemini models to generate natural language advice. No personally identifiable identity information is transmitted to the AI reasoning engine.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              4. Data Subject Rights
            </h2>
            <p>
              You maintain the right to inspect, modify, or permanently delete your account profile and stored weather preferences at any time directly through the Settings dashboard or by contacting our data protection officer.
            </p>
          </section>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Need more details on how your information is handled?
            </p>
            <Link
              to="/contact"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
            >
              Contact Data Protection →
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
