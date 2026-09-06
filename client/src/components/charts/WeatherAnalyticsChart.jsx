import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { LineChart as ChartIcon, Thermometer, CloudRain, Droplets, Wind, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { analyticsAPI } from '../../services/api';
import { useWeather } from '../../context/WeatherContext';
import { formatTemperature } from '../../utils/formatters';

// Custom Glassmorphic Tooltip
const CustomTooltip = ({ active, payload, label, metric, tempUnit }) => {
  if (!active || !payload || !payload.length) return null;

  const dataPoint = payload[0]?.payload;
  const val = payload[0]?.value;

  const getFormattedValue = () => {
    switch (metric) {
      case 'temperature':
        return `${val}°${tempUnit}`;
      case 'rainfall':
        return `${val} mm`;
      case 'humidity':
        return `${val}%`;
      case 'windSpeed':
        return `${val} km/h`;
      default:
        return val;
    }
  };

  const getMetricLabel = () => {
    switch (metric) {
      case 'temperature':
        return 'Temperature';
      case 'rainfall':
        return 'Precipitation';
      case 'humidity':
        return 'Relative Humidity';
      case 'windSpeed':
        return 'Wind Velocity';
      default:
        return metric;
    }
  };

  return (
    <div className="bg-slate-950/95 backdrop-blur-xl border border-white/15 p-3 rounded-2xl shadow-2xl text-xs space-y-1 z-50">
      <p className="font-bold text-slate-300 border-b border-white/10 pb-1">{label}</p>
      <div className="flex items-center gap-2 pt-0.5">
        <span className="w-2.5 h-2.5 rounded-full bg-sky-400 flex-shrink-0" />
        <span className="text-slate-400">{getMetricLabel()}:</span>
        <span className="font-extrabold text-white text-sm">{getFormattedValue()}</span>
      </div>
      {dataPoint?.feelsLike && metric === 'temperature' && (
        <p className="text-[10px] text-slate-400">
          Feels like <span className="text-sky-300 font-semibold">{dataPoint.feelsLike}°{tempUnit}</span>
        </p>
      )}
    </div>
  );
};

export const WeatherAnalyticsChart = () => {
  const { activeLocation, tempUnit } = useWeather();
  const [range, setRange] = useState('7d'); // '24h' | '7d' | '30d'
  const [metric, setMetric] = useState('temperature'); // 'temperature' | 'rainfall' | 'humidity' | 'windSpeed'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeLocation || !activeLocation.latitude) return;
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await analyticsAPI.getTrends(activeLocation.latitude, activeLocation.longitude, range);
        if (res.data?.success && res.data?.data?.analytics?.series) {
          setData(res.data.data.analytics.series);
        }
      } catch (err) {
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [activeLocation, range]);

  const metrics = [
    { id: 'temperature', name: 'Temperature', icon: Thermometer, color: '#38BDF8', gradient: ['#38BDF8', '#0284C7'] },
    { id: 'rainfall', name: 'Rainfall', icon: CloudRain, color: '#06B6D4', gradient: ['#06B6D4', '#0891B2'] },
    { id: 'humidity', name: 'Humidity', icon: Droplets, color: '#818CF8', gradient: ['#818CF8', '#4F46E5'] },
    { id: 'windSpeed', name: 'Wind Speed', icon: Wind, color: '#F59E0B', gradient: ['#F59E0B', '#D97706'] }
  ];

  const currentMetricObj = metrics.find((m) => m.id === metric) || metrics[0];

  // Calculate high & low from series
  const values = data.map((d) => d[metric]).filter((v) => typeof v === 'number');
  const maxVal = values.length ? Math.max(...values) : 0;
  const minVal = values.length ? Math.min(...values) : 0;

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col gap-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <ChartIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Weather Trends & Analytics</h2>
            <p className="text-[11px] text-slate-400">High-resolution harmonic time-series data • {activeLocation?.city || 'Selected Area'}</p>
          </div>
        </div>

        {/* Range Selector (24H, 7D, 30D) */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
          {['24h', '7d', '30d'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                range === r
                  ? 'bg-sky-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Selector Pills & Range Summary */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {metrics.map((m) => {
            const Icon = m.icon;
            const isSelected = metric === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMetric(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white/15 text-white border border-white/25 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>

        {values.length > 0 && (
          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" /> Max: <strong className="text-white">{maxVal}</strong>
            </span>
            <span className="flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5 text-sky-400" /> Min: <strong className="text-white">{minVal}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72 mt-2">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
            Loading analytics data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {metric === 'rainfall' ? (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="label"
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  interval={range === '30d' ? 4 : range === '24h' ? 3 : 0}
                />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  content={<CustomTooltip metric={metric} tempUnit={tempUnit} />}
                />
                <Bar dataKey="rainfall" name="Rainfall" fill="#06B6D4" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentMetricObj.color} stopOpacity={0.45} />
                    <stop offset="95%" stopColor={currentMetricObj.color} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="label"
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  interval={range === '30d' ? 4 : range === '24h' ? 3 : 0}
                />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  content={<CustomTooltip metric={metric} tempUnit={tempUnit} />}
                />
                <Area
                  type="monotone"
                  dataKey={metric}
                  stroke={currentMetricObj.color}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#metricGradient)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
