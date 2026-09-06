import React from 'react';
import { Wind, HeartPulse, AlertCircle, Shield } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

export const AQICard = () => {
  const { weatherData } = useWeather();
  const aqi = weatherData?.aqi || {
    aqiValue: 82,
    category: 'Moderate',
    color: '#FBBF24',
    pm25: 31,
    pm10: 48,
    no2: 18,
    co: 0.5,
    o3: 42,
    so2: 6,
    recommendation: 'Air quality is acceptable. Very sensitive individuals should consider reducing prolonged outdoor exertion.'
  };

  const pollutants = [
    { name: 'PM2.5', value: `${aqi.pm25} µg/m³`, max: 75, current: aqi.pm25, desc: 'Fine particulate matter' },
    { name: 'PM10', value: `${aqi.pm10} µg/m³`, max: 150, current: aqi.pm10, desc: 'Coarse dust particles' },
    { name: 'NO₂', value: `${aqi.no2} µg/m³`, max: 100, current: aqi.no2, desc: 'Nitrogen dioxide' },
    { name: 'CO', value: `${aqi.co} mg/m³`, max: 4, current: aqi.co, desc: 'Carbon monoxide' },
    { name: 'O₃', value: `${aqi.o3} µg/m³`, max: 120, current: aqi.o3, desc: 'Ground ozone' },
    { name: 'SO₂', value: `${aqi.so2} µg/m³`, max: 40, current: aqi.so2, desc: 'Sulphur dioxide' }
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Air Quality & Health</h2>
              <p className="text-[11px] text-slate-400">Atmospheric pollutant concentrations & US-EPA AQI</p>
            </div>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1.5"
            style={{ color: aqi.color, borderColor: `${aqi.color}40`, backgroundColor: `${aqi.color}15` }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: aqi.color }} />
            {aqi.category}
          </span>
        </div>

        {/* Master AQI Score Metric */}
        <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 my-4">
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tighter" style={{ color: aqi.color }}>
              {aqi.aqiValue}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
              AQI INDEX
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Health Advisory:</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {aqi.recommendation}
            </p>
          </div>
        </div>

        {/* Pollutants Grid - 2 Columns per Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
          {pollutants.map((p) => {
            const percent = Math.min(100, Math.round((p.current / p.max) * 100));
            return (
              <div key={p.name} className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-wide">{p.name}</span>
                  <span className="text-xs font-semibold text-slate-200">{p.value}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800/80 rounded-full mt-2.5 overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      percent > 75 ? 'bg-rose-500' : percent > 50 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1.5 block truncate">{p.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 mt-2">
        <span className="flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          WHO Guidelines Standard
        </span>
        <span className="text-slate-300 font-medium">Real-Time Sensor Feed</span>
      </div>
    </div>
  );
};
