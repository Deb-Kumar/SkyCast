import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Droplet, Sun, Wind, Compass, Sunrise, Sunset } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { formatTemperature, formatDate, formatWindSpeed, formatTime } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIcons';

export const DailyForecast = ({ daysToShow = 7 }) => {
  const { weatherData, tempUnit, windUnit, timeFormat } = useWeather();
  const daily = (weatherData?.daily || []).slice(0, daysToShow);
  const [expandedDay, setExpandedDay] = useState(null);

  if (!daily.length) return null;

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">{daysToShow}-Day Weather Outlook</h2>
            <p className="text-[11px] text-slate-400">Click any day for deep meteorological breakdown</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {daily.map((day, idx) => {
          const isToday = idx === 0;
          const isExpanded = expandedDay === idx;

          return (
            <div
              key={day.date}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/90 border-sky-500/40 shadow-xl'
                  : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10'
              }`}
            >
              {/* Summary Row */}
              <div
                onClick={() => setExpandedDay(isExpanded ? null : idx)}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="w-28 sm:w-36 flex items-center gap-2">
                  <span className={`text-sm font-semibold ${isToday ? 'text-sky-400' : 'text-slate-200'}`}>
                    {isToday ? 'Today' : formatDate(day.date)}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-1">
                  {getWeatherIcon(day.icon, 'w-6 h-6 flex-shrink-0')}
                  <span className="text-xs text-slate-300 hidden sm:inline truncate font-medium">
                    {day.condition}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-cyan-400 w-16">
                  {day.pop > 0 && (
                    <>
                      <Droplet className="w-3.5 h-3.5" />
                      <span>{day.pop}%</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm font-bold text-right">
                  <span className="text-white">{formatTemperature(day.tempMax, tempUnit)}</span>
                  <span className="text-slate-400 font-normal">{formatTemperature(day.tempMin, tempUnit)}</span>
                </div>

                <div className="text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expandable Deep Breakdown */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/40">
                  <div className="p-2.5 rounded-xl bg-white/5">
                    <span className="text-[10px] text-slate-400 block">Rainfall Accumulation</span>
                    <span className="text-xs font-semibold text-cyan-300 mt-0.5 block">{day.rain || 0} mm</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5">
                    <span className="text-[10px] text-slate-400 block">Peak Wind Velocity</span>
                    <span className="text-xs font-semibold text-indigo-300 mt-0.5 block">{formatWindSpeed(day.windSpeedMax, windUnit)}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5">
                    <span className="text-[10px] text-slate-400 block">UV Index Range</span>
                    <span className="text-xs font-semibold text-amber-300 mt-0.5 block">{day.uvIndex} (Peak)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5">
                    <span className="text-[10px] text-slate-400 block">Sunrise & Sunset</span>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-amber-300">
                        <Sunrise className="w-3.5 h-3.5" /> {formatTime(day.sunrise, timeFormat) || day.sunrise || '--:--'}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="flex items-center gap-1 text-orange-300">
                        <Sunset className="w-3.5 h-3.5" /> {formatTime(day.sunset, timeFormat) || day.sunset || '--:--'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
