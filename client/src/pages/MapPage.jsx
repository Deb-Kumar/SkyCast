import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { WeatherMap } from '../components/map/WeatherMap';
import { Map, Compass } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const MapPage = () => {
  const { activeLocation } = useWeather();

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Live Weather Radar & Satellite Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time global radar tracking, precipitation front movements, temperature heatmaps, and wind streamlines
          </p>
        </div>

        <WeatherMap height="650px" />
      </div>
    </PageWrapper>
  );
};
