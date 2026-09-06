import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import {
  BookmarkCheck,
  Plus,
  Trash2,
  MapPin,
  Home,
  Briefcase,
  GraduationCap,
  Star,
  Compass,
  Loader2,
  Lock,
  LogIn,
  UserPlus,
  X,
  ShieldCheck
} from 'lucide-react';
import { locationAPI } from '../services/api';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';

export const Locations = () => {
  const { selectLocation, activeLocation } = useWeather();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add modal state
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTag, setSelectedTag] = useState('favorite');
  const [customName, setCustomName] = useState('');

  const loadLocations = async () => {
    setLoading(true);
    try {
      const res = await locationAPI.getSaved();
      if (res.data?.success) {
        setLocations(res.data.data.locations || []);
      }
    } catch (err) {
      console.error('Failed to load locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, [user]);

  const handleOpenAddModal = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowModal(true);
  };

  const handleSearchNew = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const res = await locationAPI.search(searchQuery);
      if (res.data?.success) {
        setSearchResults(res.data.data.results || []);
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleSaveLocation = async (loc) => {
    if (!user) {
      setShowModal(false);
      setShowAuthModal(true);
      return;
    }

    try {
      await locationAPI.addSaved({
        name: customName || loc.city,
        tag: selectedTag,
        city: loc.city,
        state: loc.state,
        country: loc.country,
        latitude: loc.latitude,
        longitude: loc.longitude
      });
      setShowModal(false);
      setSearchQuery('');
      setSearchResults([]);
      setCustomName('');
      loadLocations();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!locationToDelete) return;
    setDeleting(true);
    try {
      await locationAPI.deleteSaved(locationToDelete._id);
      setLocations((prev) => prev.filter((l) => l._id !== locationToDelete._id));
      setLocationToDelete(null);
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(false);
    }
  };

  const getTagIcon = (tag) => {
    switch (tag) {
      case 'home':
        return <Home className="w-4 h-4 text-sky-400" />;
      case 'work':
        return <Briefcase className="w-4 h-4 text-amber-400" />;
      case 'college':
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      default:
        return <Star className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Saved Favorite Locations
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Quickly switch between frequent cities, home, college campus, and work destinations
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-sky-500/20 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Location</span>
          </button>
        </div>

        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((loc) => {
              const isActive = activeLocation.latitude === loc.latitude && activeLocation.longitude === loc.longitude;
              return (
                <div
                  key={loc._id}
                  onClick={() => selectLocation(loc)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'glass-panel border-sky-500/50 ring-2 ring-sky-500/20 shadow-xl'
                      : 'glass-panel hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        {getTagIcon(loc.tag)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                          {loc.name || loc.city}
                        </h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          {loc.tag}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocationToDelete(loc);
                      }}
                      title="Remove"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 truncate">
                    {loc.city}{loc.state ? `, ${loc.state}` : ''}, {loc.country}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                    <span>
                      {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                    </span>
                    {isActive ? (
                      <span className="text-sky-400 font-bold flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" /> Active Location
                      </span>
                    ) : (
                      <span className="text-slate-400 group-hover:text-white transition-colors">
                        Click to view weather →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Delete Location Confirmation Pop-up Modal */}
        {locationToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel w-full max-w-md p-6 sm:p-7 rounded-3xl border border-rose-500/30 shadow-2xl relative bg-slate-950/95">
              {/* Close Button */}
              <button
                onClick={() => setLocationToDelete(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon & Heading */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-600/30 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/20">
                  <Trash2 className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Remove Saved Location?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Are you sure you want to remove <span className="text-white font-semibold">{locationToDelete.name || locationToDelete.city}</span> from your saved favorites?
                </p>
              </div>

              {/* Location Details Card */}
              <div className="my-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="p-2 rounded-xl bg-white/10 text-slate-200">
                    {getTagIcon(locationToDelete.tag)}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-white truncate">
                      {locationToDelete.name || locationToDelete.city}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {locationToDelete.city}{locationToDelete.state ? `, ${locationToDelete.state}` : ''}, {locationToDelete.country}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10 flex-shrink-0">
                  {locationToDelete.tag}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Removing Location...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Yes, Remove Location</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setLocationToDelete(null)}
                  disabled={deleting}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Authentication Required Pop-up Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel w-full max-w-md p-6 sm:p-7 rounded-3xl border border-sky-500/30 shadow-2xl relative bg-slate-950/90">
              {/* Close Button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon & Heading */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/30 border border-sky-500/40 flex items-center justify-center text-sky-400 mb-4 shadow-lg shadow-sky-500/20">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  You are Not Logged In
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                  If you want to save your favorite locations for quick action, please go to <strong className="text-sky-300">Login</strong> or <strong className="text-sky-300">Sign Up</strong>.
                </p>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Save your home, college campus, work destinations, and custom tags across all devices.
                </p>
              </div>

              {/* Navigation Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/login');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Go to Login</span>
                </button>

                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/register');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-sky-400" />
                  <span>Sign Up / Register</span>
                </button>

                <button
                  onClick={() => setShowAuthModal(false)}
                  className="w-full py-2 text-center text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Continue Browsing as Guest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Location Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/15 relative">
              <h2 className="text-lg font-bold text-white mb-1">Add Saved Location</h2>
              <p className="text-xs text-slate-400 mb-4">Search for a location and assign a personal tag</p>

              <form onSubmit={handleSearchNew} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city name (e.g. London, Tokyo)..."
                  className="flex-1 bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Tag Selector */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">Assign Tag</label>
                <div className="grid grid-cols-4 gap-2">
                  {['home', 'work', 'college', 'favorite'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTag(t)}
                      className={`py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                        selectedTag === t
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                          : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results List */}
              <div className="max-h-48 overflow-y-auto space-y-1.5 mb-4 scrollbar-thin">
                {searchResults.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => handleSaveLocation(res)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/5 hover:border-sky-500/40 text-xs text-white cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <span className="truncate font-medium">{res.displayName}</span>
                    <span className="text-[10px] text-sky-400 font-bold flex-shrink-0 ml-2">+ Save</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

