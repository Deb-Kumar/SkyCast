import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CloudSun,
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  Search,
  Activity,
  Map,
  Wind,
  LineChart,
  Bot,
  Zap,
  Globe
} from 'lucide-react';
import { useWeather, DEFAULT_LOCATION } from '../context/WeatherContext';
import { locationAPI } from '../services/api';
import { Footer } from '../components/layout/Footer';

const POPULAR_CITIES = [
  { name: 'Kolkata', city: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, displayName: 'Kolkata, West Bengal, India' },
  { name: 'Delhi', city: 'Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, displayName: 'Delhi, India' },
  { name: 'Mumbai', city: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, displayName: 'Mumbai, Maharashtra, India' },
  { name: 'Chennai', city: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, displayName: 'Chennai, Tamil Nadu, India' },
  { name: 'Bangalore', city: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, displayName: 'Bengaluru, Karnataka, India' },
  { name: 'Hyderabad', city: 'Hyderabad', state: 'Telangana', country: 'India', latitude: 17.3850, longitude: 78.4867, displayName: 'Hyderabad, Telangana, India' },
  { name: 'London', city: 'London', state: 'England', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, displayName: 'London, England, United Kingdom' },
  { name: 'New York', city: 'New York', state: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, displayName: 'New York, United States' },
  { name: 'Tokyo', city: 'Tokyo', state: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, displayName: 'Tokyo, Japan' },
  { name: 'Hong Kong', city: 'Hong Kong', state: '', country: 'Hong Kong', latitude: 22.3193, longitude: 114.1694, displayName: 'Hong Kong, China' }
];

export const Landing = () => {
  const { selectLocation, useCurrentLocation, activeLocation } = useWeather();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      // Default to Kolkata if activeLocation not set or empty
      if (!activeLocation || !activeLocation.city) {
        selectLocation(DEFAULT_LOCATION);
      }
      navigate('/dashboard');
      return;
    }
    try {
      const res = await locationAPI.search(searchQuery);
      if (res.data?.success && res.data.data?.results?.length) {
        selectLocation(res.data.data.results[0]);
      }
    } catch {
      // Fallback
    }
    navigate('/dashboard');
  };

  const handleLocate = () => {
    useCurrentLocation();
    navigate('/dashboard');
  };

  const handleCitySelect = (cityObj) => {
    selectLocation(cityObj);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col selection:bg-sky-500 selection:text-white relative overflow-hidden">
      {/* Background Ambience Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-sky-500/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
            <CloudSun className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent">
            SkyCast
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-sky-500/20"
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4 animate-pulse" />
          Next-Gen Meteorological Platform with Grounded Gemini AI
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl">
          Understand Your Weather.{' '}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            Before It Happens.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          SkyCast pairs real-time multi-model forecasting, interactive satellite radar maps, and AQI analytics with a context-grounded AI assistant and proprietary Smart Activity Scores.
        </p>

        {/* Global Instant Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-xl mt-8 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, state, country (e.g. Kolkata, London, Tokyo)..."
              className="w-full bg-slate-900/90 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 shadow-xl"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleLocate}
              title="Locate Me"
              className="px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-white/15 hover:border-sky-500/40 text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Compass className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Quick Location Badges */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap text-xs text-slate-400 max-w-3xl mx-auto">
          <span className="font-semibold text-slate-400">Popular:</span>
          {POPULAR_CITIES.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => handleCitySelect(c)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 border border-white/5 hover:border-sky-500/30 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Built for Precision & Meteorological Intelligence
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Beyond standard thermometers — an end-to-end climate decision platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl group hover:border-sky-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 w-max mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Grounded Gemini AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask natural language questions like "Should I carry an umbrella?" or "Can I play football at 5 PM?". Strictly verified against live weather data.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl group hover:border-emerald-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-max mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Activity Scores</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Proprietary weighted algorithms calculating outdoor feasibility for Football, Walking, Riding, and Photography from 0 to 100.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl group hover:border-indigo-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 w-max mb-4">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Interactive Radar Maps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-layer Leaflet satellite mapping with toggleable Precipitation Radar, Temperature Heatmaps, Wind Streams, and Cloud Cover.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl group hover:border-amber-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 w-max mb-4">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Air Quality & Health</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time AQI tracking with PM2.5, PM10, NO₂, CO, O₃ pollutant monitoring and targeted medical health advisories.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl group hover:border-cyan-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 w-max mb-4">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Historical Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Time-series Recharts comparisons of temperature variations, rainfall accumulation, and seasonal anomaly benchmarks.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl group hover:border-rose-500/40 transition-all">
            <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 w-max mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Severe Alerts Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Early warning detection for thunderstorms, heatwaves, cyclones, gale winds, and hazardous air quality spikes.
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Platform Footer */}
      <Footer />
    </div>
  );
};
