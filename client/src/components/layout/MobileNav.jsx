import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Map as MapIcon,
  Wind,
  Bot
} from 'lucide-react';

const MOBILE_NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Forecast', path: '/forecast', icon: CalendarDays },
  { name: 'Radar', path: '/map', icon: MapIcon },
  { name: 'Air Quality', path: '/air-quality', icon: Wind },
  { name: 'AI Consult', path: '/ai-weather', icon: Bot, highlight: true }
];

export const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl bg-slate-950/90 dark:bg-slate-950/90 border-t border-white/10 dark:border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] px-3 py-2 transition-colors">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {MOBILE_NAV_ITEMS.map((item) => {
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
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-400 shadow-md shadow-sky-500/30 ring-1 ring-sky-500/40'
                    : item.highlight
                    ? 'text-sky-400'
                    : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold tracking-tight mt-0.5 whitespace-nowrap">
                {item.name}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,1)]" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
