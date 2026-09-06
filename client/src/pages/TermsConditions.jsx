import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { FileText, ShieldAlert, CheckCircle, Scale, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsConditions = () => {
  return (
    <PageWrapper>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5" />
            Legal Agreement
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Last Updated: September 2026 • Please read these terms carefully before utilizing the SkyCast platform.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or using the SkyCast application, web portal, or API services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and comply with all applicable local, national, and international laws.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              2. Meteorological Data & Forecast Accuracy Disclaimer
            </h2>
            <p>
              SkyCast provides meteorological insights synthesized from Open-Meteo, numerical weather prediction models (ECMWF, GFS, ICON), Doppler radar arrays, and Google Gemini AI. Atmospheric physics and forecasting involve probabilistic calculations; therefore, weather conditions may vary from computed predictions.
            </p>
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Important:</strong> In situations involving extreme weather events, cyclones, flash floods, or evacuation mandates, users must prioritize official emergency bulletins issued by municipal civil defense authorities and governmental meteorological departments.
              </span>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              3. User Accounts & Session Security
            </h2>
            <p>
              When creating an account on SkyCast, you are responsible for maintaining the confidentiality of your login credentials and password. You agree to accept responsibility for all activities and data requests that occur under your session.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              4. Prohibited Uses & API Restrictions
            </h2>
            <p>
              You agree not to engage in unauthorized automated scraping, denial-of-service attempts, or reverse-engineering of SkyCast algorithms, Doppler tiles, or AI reasoning prompts without explicit written authorization.
            </p>
          </section>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Questions about our terms? Reach our compliance department.
            </p>
            <Link
              to="/contact"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
            >
              Contact Legal & Support →
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
