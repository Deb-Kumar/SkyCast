import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Compass,
  User,
  LogOut,
  Settings,
  Sparkles,
  CloudSun,
  Loader2,
  X,
  SunMoon
} from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { locationAPI } from '../../services/api';

export const Navbar = () => {
  const { activeLocation, selectLocation, searchAndSelectLocation, useCurrentLocation, loading, locating } = useWeather();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Debounced Search suggestions
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await locationAPI.search(searchQuery);
        if (res.data?.success) {
          setSearchResults(res.data.data.results || []);
          setIsDropdownOpen(true);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (loc) => {
    selectLocation(loc);
    setIsDropdownOpen(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
  };

  // Handle direct Enter or Search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // If dropdown already has results, pick the top one
    if (searchResults.length > 0) {
      handleSelectLocation(searchResults[0]);
      return;
    }

    setSearching(true);
    try {
      await searchAndSelectLocation(searchQuery);
      setIsDropdownOpen(false);
      setIsMobileSearchOpen(false);
      setSearchQuery('');
    } finally {
      setSearching(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-slate-950/80 border-b border-white/10 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 transition-colors shadow-lg shadow-black/20 relative">
      {/* Top Stream Progress Indicator */}
      {(loading || locating) && (
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500 animate-pulse z-50 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
      )}

      <div className="max-w-[1520px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Brand */}
        <Link to="/dashboard" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
            <CloudSun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-sky-600 to-indigo-600 dark:from-white dark:via-sky-100 dark:to-sky-400 bg-clip-text text-transparent brand-logo-text">
              SkyCast
            </span>
            <span className="hidden xs:inline-block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
              AI PRO
            </span>
          </div>
        </Link>

        {/* Global Desktop Search Bar with Form Submit */}
        <div ref={searchRef} className="relative flex-1 max-w-lg hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <button
              type="submit"
              title="Search Location"
              className="absolute left-3.5 text-slate-400 hover:text-sky-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
              placeholder="Search city, state, postal code (Press Enter)..."
              className="w-full bg-slate-900/90 border border-white/10 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
            />
            {searching || loading ? (
              <Loader2 className="absolute right-3.5 w-4 h-4 text-sky-400 animate-spin" />
            ) : searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </form>

          {/* Search Dropdown */}
          {isDropdownOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-white/5">
              {searchResults.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-sky-500/15 transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-sky-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white truncate">
                      {loc.displayName}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 flex-shrink-0 ml-2">
                    {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            title="Search city"
            className="sm:hidden p-2 rounded-xl bg-slate-900/80 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-sky-400 transition-all flex items-center justify-center flex-shrink-0"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Auto Locate Button with Live Spinner */}
          <button
            onClick={useCurrentLocation}
            disabled={locating}
            title="Use current geolocation"
            className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-semibold transition-all group flex-shrink-0 ${
              locating
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 ring-2 ring-sky-500/20'
                : 'bg-slate-900/80 hover:bg-sky-500/20 border-white/10 hover:border-sky-500/40 text-slate-200 hover:text-sky-300'
            }`}
          >
            {locating ? (
              <Loader2 className="w-4 h-4 text-sky-400 animate-spin flex-shrink-0" />
            ) : (
              <Compass className="w-4 h-4 text-sky-400 group-hover:rotate-45 transition-transform flex-shrink-0" />
            )}
            <span className="hidden md:inline">{locating ? 'Locating...' : 'Auto Locate'}</span>
          </button>

          {/* Active Location Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span className="max-w-[120px] truncate font-semibold">{activeLocation?.city || 'Your Location'}</span>
          </div>

          {/* AI Weather Quick Action */}
          <Link
            to="/ai-weather"
            title="AI Weather Assistant"
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 border border-sky-500/40 text-xs font-bold text-sky-300 transition-all shadow-sm flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-sky-300 animate-pulse flex-shrink-0" />
            <span className="hidden sm:inline">AI Pro</span>
          </Link>

          {/* Theme Quick Toggle */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Daylight' : 'Dark Space'} Mode`}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-400 transition-all flex items-center justify-center flex-shrink-0"
          >
            <SunMoon className="w-4 h-4" />
          </button>

          {/* Profile / Auth Menu */}
          <div ref={profileRef} className="relative flex-shrink-0">
            {user ? (
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-md hover:ring-2 hover:ring-sky-400/50 transition-all flex-shrink-0"
              >
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs whitespace-nowrap transition-colors shadow-md shadow-sky-500/20 flex-shrink-0"
              >
                Sign In
              </Link>
            )}

            {/* Profile Dropdown */}
            {isProfileOpen && user && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 divide-y divide-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Preferences & Units
                  </Link>
                  <Link
                    to="/locations"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Saved Locations
                  </Link>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="sm:hidden mt-2.5 pt-2.5 border-t border-white/10 animate-in fade-in slide-in-from-top-1 duration-200">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any city or place..."
              className="w-full bg-slate-900/95 border border-sky-500/30 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400 shadow-inner"
            />
            {searching ? (
              <Loader2 className="absolute right-3 w-3.5 h-3.5 text-sky-400 animate-spin" />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsMobileSearchOpen(false);
                }}
                className="absolute right-3 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Mobile Search Dropdown Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-slate-900/98 border border-white/15 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-white/5">
              {searchResults.slice(0, 5).map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc)}
                  className="w-full px-3 py-2.5 text-left flex items-center justify-between hover:bg-sky-500/15 transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                    <span className="text-xs font-medium text-slate-200 truncate">
                      {loc.displayName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

