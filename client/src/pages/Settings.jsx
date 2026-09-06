import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import {
  Sliders,
  Thermometer,
  Wind,
  Clock,
  SunMoon,
  Bell,
  ShieldCheck,
  Check,
  KeyRound,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Lock,
  LogIn,
  UserPlus,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { authAPI } from '../services/api';

export const Settings = () => {
  const { tempUnit, setTempUnit, windUnit, setWindUnit, timeFormat, setTimeFormat } = useWeather();
  const { user, updatePreferences } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password Update State
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  const [notifications, setNotifications] = useState({
    rain: user?.preferences?.notifications?.rain ?? true,
    severeWeather: user?.preferences?.notifications?.severeWeather ?? true,
    aqi: user?.preferences?.notifications?.aqi ?? false,
    dailySummary: user?.preferences?.notifications?.dailySummary ?? true
  });

  const handleSave = async () => {
    if (user) {
      await updatePreferences({
        temperatureUnit: tempUnit,
        windSpeedUnit: windUnit,
        timeFormat,
        theme,
        notifications
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match. Please re-enter.');
      return;
    }

    setPassLoading(true);
    try {
      const res = await authAPI.updatePassword({
        currentPassword,
        newPassword
      });

      if (res.data?.success) {
        setPassSuccess(res.data.message || 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPassSuccess(''), 4000);
      } else {
        setPassError(res.data?.message || 'Failed to update password.');
      }
    } catch (err) {
      setPassError(err.response?.data?.message || 'Unable to update password. Please check current password.');
    } finally {
      setPassLoading(false);
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('🌦️ SkyCast Alerts Active', {
            body: 'You will receive immediate notifications for upcoming rain and severe weather warnings.'
          });
        }
      });
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Preferences & Platform Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure meteorological units, appearance, security credentials, and smart notifications
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            Preferences updated and synchronized with your active session!
          </div>
        )}

        {/* 1. Account & Security Section (Only shown when user is logged in) */}
        {user && (
          <div className="glass-panel p-6 rounded-3xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-bold text-white">Account & Security</h2>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                Verified Session
              </span>
            </div>

            {/* Email & Password Display Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400" /> Registered Email Address
                </span>
                <p className="text-sm font-bold text-white truncate">
                  {user.email}
                </p>
                {user.name && (
                  <p className="text-[11px] text-slate-400 truncate">
                    Signed in as: <strong className="text-slate-200">{user.name}</strong>
                  </p>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Security Status
                </span>
                <div className="flex items-center justify-between pt-0.5">
                  <p className="text-sm font-mono tracking-widest text-slate-300">••••••••••••</p>
                  <button
                    type="button"
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    {showPasswordSection ? 'Hide Panel' : 'Change Password →'}
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Change Password Panel */}
            {showPasswordSection && (
              <form onSubmit={handlePasswordChange} className="pt-3 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Update Account Password</h3>
                </div>

                {passSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4" /> {passSuccess}
                  </div>
                )}

                {passError && (
                  <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {passError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Current Password */}
                  <div className="space-y-1 relative">
                    <label className="text-[11px] font-semibold text-slate-400">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-1 relative">
                    <label className="text-[11px] font-semibold text-slate-400">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 6 chars"
                        className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-1 relative">
                    <label className="text-[11px] font-semibold text-slate-400">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordSection(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setPassError('');
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={passLoading || !newPassword || !confirmPassword}
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5"
                  >
                    {passLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>Save New Password</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 2. Meteorological Measurement Units */}
        <div className="glass-panel p-6 rounded-3xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Thermometer className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold text-white">Measurement Units</h2>
          </div>

          {/* Temperature Unit */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Temperature Scale</p>
              <p className="text-xs text-slate-400">Choose between Celsius or Fahrenheit across all charts and cards</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setTempUnit('C')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  tempUnit === 'C' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Celsius (°C)
              </button>
              <button
                onClick={() => setTempUnit('F')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  tempUnit === 'F' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>

          {/* Wind Speed Unit */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
            <div>
              <p className="text-sm font-semibold text-white">Wind Speed Unit</p>
              <p className="text-xs text-slate-400">Velocity scale for gusts and atmospheric streams</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-white/10">
              {['kmh', 'mph', 'ms'].map((u) => (
                <button
                  key={u}
                  onClick={() => setWindUnit(u)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    windUnit === u ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Time Standard */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
            <div>
              <p className="text-sm font-semibold text-white">Time Format</p>
              <p className="text-xs text-slate-400">12-Hour AM/PM or 24-Hour International standard</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setTimeFormat('12h')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeFormat === '12h' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                12-Hour (AM/PM)
              </button>
              <button
                onClick={() => setTimeFormat('24h')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeFormat === '24h' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                24-Hour
              </button>
            </div>
          </div>
        </div>

        {/* 3. Appearance & Theming */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <SunMoon className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Appearance & Theming</h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Glassmorphic Theme</p>
              <p className="text-xs text-slate-400">Toggle between Dark Space & Ambient Daylight styles</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  theme === 'dark'
                    ? 'bg-sky-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <SunMoon className="w-3.5 h-3.5" />
                <span>Dark Space</span>
              </button>
              <button
                type="button"
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  theme === 'light'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <SunMoon className="w-3.5 h-3.5" />
                <span>Daylight</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Smart Web Notifications */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Smart Notification Triggers</h2>
            </div>
            <button
              onClick={requestNotificationPermission}
              className="text-xs font-semibold text-sky-400 hover:underline"
            >
              Enable Browser Permissions
            </button>
          </div>

          <div className="space-y-3">
            {[
              { id: 'rain', label: 'Rain Early Warning', desc: 'Alert when precipitation probability surges within 30 minutes' },
              { id: 'severeWeather', label: 'Severe Storm & Heatwave Alerts', desc: 'Critical early alerts for gales, cyclones, and extreme temperatures' },
              { id: 'aqi', label: 'Hazardous AQI Warning', desc: 'Alert when air quality index exceeds healthy thresholds (> 150)' },
              { id: 'dailySummary', label: 'Morning Weather Briefing', desc: 'Daily meteorological outlook and Smart Outdoor Score' }
            ].map((n) => (
              <label
                key={n.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-white/5 cursor-pointer hover:border-white/15 transition-all"
              >
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{n.label}</p>
                  <p className="text-[11px] text-slate-400">{n.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[n.id]}
                  onChange={(e) => setNotifications({ ...notifications, [n.id]: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-500 bg-slate-800 border-white/20 focus:ring-sky-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </PageWrapper>
  );
};
