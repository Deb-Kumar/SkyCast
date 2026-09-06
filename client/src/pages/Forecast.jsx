import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { HourlyForecast } from '../components/weather/HourlyForecast';
import { DailyForecast } from '../components/weather/DailyForecast';
import { PrecipitationTimeline } from '../components/weather/PrecipitationTimeline';
import { CalendarDays, Clock, Droplets } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const Forecast = () => {
  const [days, setDays] = useState(7);
  const { activeLocation } = useWeather();

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Forecast Intelligence • {activeLocation.city}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Multi-model meteorological projections, precipitation windows, and atmospheric curves
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setDays(7)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                days === 7 ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              7-Day Standard
            </button>
            <button
              onClick={() => setDays(14)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                days === 14 ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              14-Day Extended
            </button>
          </div>
        </div>

        {/* Precipitation Timeline */}
        <PrecipitationTimeline />

        {/* 24-Hour Hourly Timeline */}
        <HourlyForecast />

        {/* Daily Forecast Breakdown */}
        <DailyForecast daysToShow={days} />
      </div>
    </PageWrapper>
  );
};
