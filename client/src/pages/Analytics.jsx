import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { WeatherAnalyticsChart } from '../components/charts/WeatherAnalyticsChart';
import { LineChart, History, ArrowUpRight, ArrowDownRight, Layers, Sparkles } from 'lucide-react';
import { analyticsAPI } from '../services/api';
import { useWeather } from '../context/WeatherContext';
import { formatTemperature } from '../utils/formatters';

export const Analytics = () => {
  const { activeLocation, tempUnit } = useWeather();
  const [comparisons, setComparisons] = useState(null);

  useEffect(() => {
    const loadComparisons = async () => {
      try {
        const res = await analyticsAPI.getTrends(activeLocation.latitude, activeLocation.longitude, '7d');
        if (res.data?.success && res.data?.data?.analytics?.comparisons) {
          setComparisons(res.data.data.analytics.comparisons);
        }
      } catch (err) {
        console.error('Failed to load comparisons:', err);
      }
    };
    loadComparisons();
  }, [activeLocation]);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Weather Analytics & Historical Benchmarks • {activeLocation.city}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Harmonic climate variations, multi-period trend analyses, and seasonal anomaly detection
          </p>
        </div>

        {/* Comparison Highlights Row */}
        {comparisons && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-2 text-sky-400">
                <History className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Today vs. Yesterday
                </h3>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-white">
                  {comparisons.todayVsYesterday.tempDiff >= 0 ? '+' : ''}
                  {comparisons.todayVsYesterday.tempDiff}°C
                </span>
                <span className="text-xs text-slate-400">temperature variation</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {comparisons.todayVsYesterday.summary}
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  10-Year Climate Baseline
                </h3>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-white">
                  {formatTemperature(comparisons.historicalAverage.climateAvgTemp, tempUnit)}
                </span>
                <span className="text-xs text-slate-400">historical average for this period</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {comparisons.historicalAverage.description}
              </p>
            </div>
          </div>
        )}

        {/* Master Chart Component */}
        <WeatherAnalyticsChart />
      </div>
    </PageWrapper>
  );
};
