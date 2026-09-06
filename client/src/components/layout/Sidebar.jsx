import React from 'react';
import { NavLink } from 'react-router-dom';
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
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Forecast', path: '/forecast', icon: CalendarDays },
  { name: 'Weather Map', path: '/map', icon: MapIcon },
  { name: 'Air Quality', path: '/air-quality', icon: Wind },
  { name: 'Analytics', path: '/analytics', icon: LineChart },
  { name: 'Alerts', path: '/alerts', icon: ShieldAlert, badge: 'Live' },
  { name: 'AI Assistant', path: '/ai-weather', icon: Bot, highlight: true },
  { name: 'Locations', path: '/locations', icon: BookmarkCheck },
  { name: 'Settings', path: '/settings', icon: Sliders }
];

export const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 hidden md:block py-6 pr-4">
      <div className="glass-panel rounded-2xl p-3 flex flex-col gap-1 sticky top-20">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                } ${item.highlight && !location.pathname?.includes(item.path) ? 'text-sky-300 font-semibold' : ''}`
              }
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    item.highlight ? 'text-sky-400' : 'text-slate-400 group-hover:text-sky-400'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                  {item.badge}
                </span>
              )}

              {item.highlight && (
                <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin-slow opacity-80" />
              )}
            </NavLink>
          );
        })}

        {/* Ambient Grounded AI Promo Card */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/15 via-sky-500/10 to-purple-500/15 border border-indigo-500/30 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">SkyCast Grounded AI</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Instant meteorological reasoning with live context injection.
          </p>
          <NavLink
            to="/ai-weather"
            className="mt-3 block text-center py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition-all group-hover:scale-[1.02]"
          >
            Ask AI Assistant →
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
