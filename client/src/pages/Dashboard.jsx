import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { WeatherCard } from '../components/weather/WeatherCard';
import { SmartScoreCard } from '../components/activity/SmartScoreCard';
import { PrecipitationTimeline } from '../components/weather/PrecipitationTimeline';
import { HourlyForecast } from '../components/weather/HourlyForecast';
import { DailyForecast } from '../components/weather/DailyForecast';
import { AQICard } from '../components/aqi/AQICard';
import { WeatherAnalyticsChart } from '../components/charts/WeatherAnalyticsChart';
import { WeatherMap } from '../components/map/WeatherMap';
import { useWeather } from '../context/WeatherContext';
import { Loader2 } from 'lucide-react';

export const Dashboard = () => {
  const { loading, error, weatherData, fetchWeather } = useWeather();

  return (
    <PageWrapper>
      {loading && !weatherData ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 text-sky-400 animate-spin" />
          <p className="text-sm font-semibold text-slate-300">Retrieving meteorological feeds...</p>
        </div>
      ) : error && !weatherData ? (
        <div className="glass-panel p-8 rounded-3xl text-center max-w-lg mx-auto my-12 space-y-4">
          <div>
            <p className="text-rose-400 font-bold mb-1">Weather Feed Alert</p>
            <p className="text-xs text-slate-400">{error}</p>
          </div>
          <button
            onClick={() => fetchWeather()}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
          >
            Retry Weather Feed
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Row: Hero Weather Card + Smart Outdoor Score */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <WeatherCard />
            </div>
            <div className="lg:col-span-4">
              <SmartScoreCard />
            </div>
          </div>

          {/* 3-Hour Precipitation Intelligence Timeline */}
          <PrecipitationTimeline />

          {/* 24-Hour Hourly Scrollable Strip */}
          <HourlyForecast />

          {/* Mid Row: 7-Day Forecast + AQI Health Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <DailyForecast daysToShow={7} />
            </div>
            <div className="lg:col-span-5">
              <AQICard />
            </div>
          </div>

          {/* Analytics Chart Preview */}
          <WeatherAnalyticsChart />

          {/* Interactive Radar Map Preview */}
          <WeatherMap height="400px" />
        </div>
      )}
    </PageWrapper>
  );
};
