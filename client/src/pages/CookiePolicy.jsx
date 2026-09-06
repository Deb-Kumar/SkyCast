import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Cookie, Settings2, Sliders, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookiePolicy = () => {
  return (
    <PageWrapper>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Cookie className="w-3.5 h-3.5" />
            Cookie & Storage Preferences
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            SkyCast Cookie & Local Storage Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Understanding how SkyCast utilizes browser storage tokens to keep your meteorological preferences seamless.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-400" />
              1. What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies and HTML5 Local Storage are small, secure text values stored on your web client that allow the SkyCast platform to remember your personalized settings across browser sessions.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              2. Categories of Storage Tokens We Use
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Strictly Necessary (Essential)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Required for user authentication session management (JWT tokens in HTTP-only cookies) and API security rate limiting.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Settings2 className="w-4 h-4" />
                  <span>Functional & Preferences</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Maintains your chosen measurement units (°C vs °F, km/h vs mph), dark space vs daylight theme, and saved locations.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2 pt-4 border-t border-white/10">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Check className="w-4 h-4 text-indigo-400" />
              3. Managing Your Browser Storage
            </h2>
            <p>
              You can adjust or clear stored preferences at any time directly through your web browser's privacy settings or by updating your configuration in the <Link to="/settings" className="text-sky-400 font-bold underline">Settings page</Link>.
            </p>
          </section>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Need assistance configuring your preferences?
            </p>
            <Link
              to="/settings"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
            >
              Open Settings Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
