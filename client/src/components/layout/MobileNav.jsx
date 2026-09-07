import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Map as MapIcon,
  Wind,
  LineChart,
  ShieldAlert,
  Bot,
  BookmarkCheck,
  Sliders,
  Sparkles,
  Grid,
  X,
  Compass,
  SunMoon,
  ChevronRight,
  User,
  Info
} from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const PRIMARY_MOBILE_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Forecast', path: '/forecast', icon: CalendarDays },
  { name: 'Radar', path: '/map', icon: MapIcon },
  { name: 'AI Consult', path: '/ai-weather', icon: Bot, highlight: true }
];

const ALL_NAV_ITEMS = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    desc: 'Live real-time weather metrics & conditions',
    category: 'Core'
  },
  {
    name: '7-Day Forecast',
    path: '/forecast',
    icon: CalendarDays,
    desc: 'Extended hourly & daily meteorological forecast',
    category: 'Core'
  },
  {
    name: 'Weather Radar',
    path: '/map',
    icon: MapIcon,
    desc: 'Interactive precipitation, wind & cloud map',
    category: 'Maps'
  },
  {
    name: 'Weather Alerts',
    path: '/alerts',
    icon: ShieldAlert,
    desc: 'Automated anomaly & severe storm warnings',
    category: 'Safety',
    badge: 'Live',
    badgeColor: 'rose'
  },
  {
    name: 'Air Quality (AQI)',
    path: '/air-quality',
    icon: Wind,
    desc: 'Live pollution, PM2.5, PM10 & health indices',
    category: 'Atmosphere'
  },
  {
    name: 'Analytics & Trends',
    path: '/analytics',
    icon: LineChart,
    desc: 'Historical charts, temperature & pressure trends',
    category: 'Insights',
    badge: 'Pro'
  },
  {
    name: 'AI Weather Consult',
    path: '/ai-weather',
    icon: Bot,
    desc: 'Grounded meteorological advice & reasoning',
    category: 'AI',
    badge: 'AI Pro',
    badgeColor: 'sky'
  },
  {
    name: 'Saved Locations',
    path: '/locations',
    icon: BookmarkCheck,
    desc: 'Manage pinned cities, favorite destinations',
    category: 'Personal'
  },
  {
    name: 'Settings & Units',
    path: '/settings',
    icon: Sliders,
    desc: 'Configure Celsius/Fahrenheit, notifications & units',
    category: 'Personal'
  }
];

export const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { useCurrentLocation, locating, activeLocation } = useWeather();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Close drawer on route changes
  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMoreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMoreOpen]);

  const isMoreActive = [
    '/alerts',
    '/analytics',
    '/locations',
    '/settings',
    '/air-quality',
    '/about',
    '/contact'
  ].includes(location.pathname);

  return (
    <>
      {/* Mobile Slide-Up Navigation Sheet */}
      {isMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop Blur */}
          <div
            onClick={() => setIsMoreOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-h-[85vh] overflow-y-auto bg-slate-950/95 border-t border-white/15 rounded-t-3xl shadow-[0_-16px_40px_rgba(0,0,0,0.6)] px-4 pt-4 pb-10 z-10 flex flex-col gap-4 animate-in slide-in-from-bottom-full duration-300">
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-1 flex-shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20">
                  <Grid className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-white">
                    SkyCast Navigation
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Active: <span className="text-sky-300 font-medium">{activeLocation?.city || 'Selected City'}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Close Navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  useCurrentLocation();
                  setIsMoreOpen(false);
                }}
                disabled={locating}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all shadow-sm"
              >
                <Compass className={`w-4 h-4 text-sky-400 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? 'Locating...' : 'Auto Locate'}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-bold transition-all shadow-sm"
              >
                <SunMoon className="w-4 h-4 text-amber-400" />
                <span>{theme === 'dark' ? 'Daylight Mode' : 'Dark Space'}</span>
              </button>
            </div>

            {/* Navigation Grid (All pages including Settings, Locations, Alerts, Analytics) */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 pt-1">
                Explore All Features
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {ALL_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMoreOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-sky-500/25 to-indigo-500/20 border-sky-500/40 text-white shadow-md shadow-sky-500/10'
                          : 'bg-slate-900/70 hover:bg-white/5 border-white/5 text-slate-200 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl transition-all ${
                            isActive
                              ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/30'
                              : 'bg-white/5 text-sky-400 border border-white/10'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-100'}`}>
                              {item.name}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                                  item.badgeColor === 'rose'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight line-clamp-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? 'text-sky-400 translate-x-0.5' : 'text-slate-500'}`} />
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Account & Info Links */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 px-1">
              {user ? (
                <NavLink
                  to="/settings"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="font-semibold text-slate-200 truncate max-w-[150px]">{user.name}</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-bold"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In / Register</span>
                </NavLink>
              )}

              <div className="flex items-center gap-3">
                <NavLink
                  to="/about"
                  onClick={() => setIsMoreOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  About
                </NavLink>
                <span>•</span>
                <NavLink
                  to="/contact"
                  onClick={() => setIsMoreOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Fixed Bottom Navigation Bar - Perfectly spaced 5 items */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl bg-slate-950/95 border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] px-3 py-2 transition-colors">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {PRIMARY_MOBILE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-sky-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all relative ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-400 shadow-md shadow-sky-500/30 ring-1 ring-sky-500/40'
                      : item.highlight
                      ? 'text-sky-400'
                      : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold tracking-tight mt-0.5 whitespace-nowrap">
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,1)]" />
                )}
              </NavLink>
            );
          })}

          {/* More Menu Toggle Button */}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              isMoreOpen || isMoreActive
                ? 'text-sky-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="More Navigation Options"
          >
            <div
              className={`p-1.5 rounded-xl transition-all relative ${
                isMoreOpen || isMoreActive
                  ? 'bg-sky-500/20 text-sky-400 shadow-md shadow-sky-500/30 ring-1 ring-sky-500/40'
                  : ''
              }`}
            >
              <Grid className="w-4 h-4" />
              {isMoreActive && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-slate-950 animate-pulse" />
              )}
            </div>
            <span className="text-[10px] font-semibold tracking-tight mt-0.5 whitespace-nowrap">
              More
            </span>
            {(isMoreOpen || isMoreActive) && (
              <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,1)]" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
