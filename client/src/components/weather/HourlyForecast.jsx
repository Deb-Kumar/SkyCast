import React from 'react';
import { Clock, Droplet } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { formatTemperature, formatTime } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIcons';

export const HourlyForecast = () => {
  const { weatherData, tempUnit, timeFormat } = useWeather();
  const hourly = weatherData?.hourly || [];

  if (!hourly.length) return null;

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">24-Hour Hourly Forecast</h2>
            <p className="text-[11px] text-slate-400">Detailed conditions, rain probability, and temperature</p>
          </div>
        </div>
        <span className="text-xs text-slate-400">Scroll horizontally →</span>
      </div>

      {/* Horizontal Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {hourly.map((item, idx) => {
          const isNow = idx === 0;
          return (
            <div
              key={idx}
              className={`flex-shrink-0 w-24 p-3 rounded-2xl flex flex-col items-center gap-2 transition-all duration-200 ${
                isNow
                  ? 'bg-gradient-to-b from-sky-500/25 to-slate-900 border border-sky-500/40 shadow-lg shadow-sky-500/10'
                  : 'bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <span className={`text-xs font-semibold ${isNow ? 'text-sky-300 font-bold' : 'text-slate-400'}`}>
                {isNow ? 'Now' : formatTime(item.time, timeFormat)}
              </span>

              <div className="my-1">{getWeatherIcon(item.icon, 'w-7 h-7')}</div>

              <span className="text-base font-extrabold text-white">
                {formatTemperature(item.temp, tempUnit)}
              </span>

              <div className="flex items-center gap-1 text-[11px] text-cyan-300 mt-0.5">
                <Droplet className="w-3 h-3" />
                <span>{item.pop}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
