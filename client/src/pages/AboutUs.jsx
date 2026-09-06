import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import {
  Sparkles,
  CloudSun,
  ShieldCheck,
  Cpu,
  Globe,
  Radio,
  BarChart3,
  Layers,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutUs = () => {
  return (
    <PageWrapper>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Next-Gen Meteorological Operating System
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">SkyCast Platform</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Synthesizing global Doppler radar feeds, Open-Meteo satellite arrays, and Google Gemini AI reasoning to deliver accurate weather insights and early storm alerts.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Live Doppler Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time precipitation radar integration powered by RainViewer global Doppler layers with sub-kilometer visual fidelity.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Grounded Gemini AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-hallucination meteorological reasoning injected with live temperature, humidity, UV, and wind telemetry.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Hyper-Local Geocoding</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-tiered reverse geocoding providing neighborhood and municipality precision (e.g. Barasat, Salt Lake, New Town).
            </p>
          </div>
        </div>

        {/* Deep Tech Overview Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Our Mission & Data Architecture</h2>
              <p className="text-xs text-slate-400">Empowering everyday decisions with scientific atmospheric clarity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Precision Atmospheric Models
              </h4>
              <p>
                SkyCast aggregates high-resolution numerical weather prediction (NWP) models, including ECMWF, GFS, ICON, and DWD models through the Open-Meteo API. This guarantees resilient forecasts with 14-day extended outlooks and hourly historical analytics.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                Comprehensive Air Quality Tracking
              </h4>
              <p>
                We continuously monitor particulate matter (PM2.5, PM10), nitrogen dioxide (NO₂), carbon monoxide (CO), and ozone (O₃) to calculate accurate Air Quality Indexes (AQI) with real-time health advisories for athletes and families.
              </p>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              Have meteorological inquiries or wish to collaborate?
            </p>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-sky-500/20"
            >
              Contact Our Team →
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
