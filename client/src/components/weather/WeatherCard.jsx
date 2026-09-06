import React from 'react';
import {
  Droplets,
  Wind,
  Sun,
  Eye,
  Compass,
  Gauge,
  Sunrise,
  Sunset,
  ArrowUp,
  ArrowDown,
  Radio
} from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { formatTemperature, formatWindSpeed, formatTime } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIcons';
import { WeatherAtmosphere } from './WeatherAtmosphere';

export const WeatherCard = () => {
  const { weatherData, tempUnit, windUnit, timeFormat, activeLocation } = useWeather();

  if (!weatherData) return null;

  const { current, daily = [], aqi } = weatherData;
  const today = daily[0] || {};

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-7 relative overflow-hidden group h-full flex flex-col justify-between">
      {/* Dynamic Weather Background Animation (Clouds, Rain, Thunderstorm, Snow, Sun) */}
      <WeatherAtmosphere condition={current.condition} icon={current.icon} />

      {/* Ambient Radial Highlight */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl group-hover:bg-sky-500/20 transition-all duration-700 pointer-events-none z-0" />

      {/* Header Section: City, Date, Live Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeLocation.city || weatherData.cityName || 'Your Location'}
            </h1>
            {activeLocation.country && (
              <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                {activeLocation.country}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            <span>•</span>
            <span className="text-sky-400 font-medium">Verified Sensor Stream</span>
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Live Grounding
          </span>
        </div>
      </div>

      {/* Main Temp Hero & Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 my-4 sm:my-6 items-center relative z-10">
        {/* Left Side: Large Temp & Icon */}
        <div className="md:col-span-6 flex items-center gap-4 sm:gap-5">
          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner flex-shrink-0">
            {getWeatherIcon(current.icon, 'w-14 h-14 sm:w-20 sm:h-20')}
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white">
                {formatTemperature(current.temperature, tempUnit)}
              </span>
            </div>
            <p className="text-sm sm:text-lg font-semibold text-sky-200 mt-0.5">
              {current.condition}
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Feels like <span className="text-slate-200 font-medium">{formatTemperature(current.feelsLike, tempUnit)}</span>
            </p>
          </div>
        </div>

        {/* Right Side: 4 Essential Cards */}
        <div className="md:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* High / Low */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">High / Low</span>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 text-xs sm:text-sm font-bold text-white">
              <span className="flex items-center text-amber-400">
                <ArrowUp className="w-3.5 h-3.5 mr-0.5" /> {formatTemperature(today.tempMax, tempUnit)}
              </span>
              <span className="flex items-center text-sky-400">
                <ArrowDown className="w-3.5 h-3.5 mr-0.5" /> {formatTemperature(today.tempMin, tempUnit)}
              </span>
            </div>
          </div>

          {/* Air Quality */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">Air Quality</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: aqi?.color || '#FBBF24' }}
              />
              <span className="text-xs sm:text-sm font-bold text-white truncate">
                {aqi?.aqiValue} • {aqi?.category?.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* UV Index */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">UV Index</span>
            <div className="flex items-center gap-1.5 mt-1 text-xs sm:text-sm font-bold text-white">
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>{current.uvIndex} <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal">/ 11+</span></span>
            </div>
          </div>

          {/* Sunrise & Sunset Card */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">Sunrise & Sunset</span>
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              <div className="flex items-center gap-1 min-w-0">
                <div className="p-1 rounded-lg bg-amber-500/15 text-amber-400 flex-shrink-0">
                  <Sunrise className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-slate-400 block leading-tight">Rise</span>
                  <span className="text-[10px] sm:text-xs font-bold text-white block leading-tight whitespace-nowrap">
                    {formatTime(current.sunrise, timeFormat) || current.sunrise || '--:--'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 min-w-0">
                <div className="p-1 rounded-lg bg-orange-500/15 text-orange-400 flex-shrink-0">
                  <Sunset className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-slate-400 block leading-tight">Set</span>
                  <span className="text-[10px] sm:text-xs font-bold text-white block leading-tight whitespace-nowrap">
                    {formatTime(current.sunset, timeFormat) || current.sunset || '--:--'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Detailed Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 pt-4 sm:pt-5 border-t border-white/10 relative z-10">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 flex-shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">Humidity</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{current.humidity}%</p>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 flex-shrink-0">
            <Wind className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">Wind Speed</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{formatWindSpeed(current.windSpeed, windUnit)}</p>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 flex-shrink-0">
            <Gauge className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">Pressure</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{current.pressure} hPa</p>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 flex-shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">Visibility</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{current.visibility} km</p>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 flex-shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">Dew Point</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{formatTemperature(current.dewPoint, tempUnit)}</p>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 flex-shrink-0">
            <Sun className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">Cloud Cover</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{current.cloudCover}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
