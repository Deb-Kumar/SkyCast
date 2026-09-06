import React from 'react';
import { CloudRain, Sparkles, Umbrella, Droplet } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

export const PrecipitationTimeline = () => {
  const { weatherData } = useWeather();
  const timeline = weatherData?.precipitationTimeline || [
    { time: 'NOW', probability: 10, intensity: 'Light', amount: 0 },
    { time: '30m', probability: 45, intensity: 'Moderate', amount: 0.5 },
    { time: '1h', probability: 75, intensity: 'Heavy', amount: 2.1 },
    { time: '1.5h', probability: 60, intensity: 'Moderate', amount: 1.2 },
    { time: '2h', probability: 25, intensity: 'Light', amount: 0.1 },
    { time: '3h', probability: 5, intensity: 'None', amount: 0 }
  ];

  const maxProb = Math.max(...timeline.map((t) => t.probability), 0);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-tight">Precipitation Intelligence</h2>
            <p className="text-[11px] text-slate-400">Next 3-hour minute forecast timeline & intensity projections</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {maxProb > 50 ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
              <Umbrella className="w-3.5 h-3.5" />
              Rain likely ahead ({maxProb}%)
            </span>
          ) : (
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <Droplet className="w-3.5 h-3.5" />
              Clear precipitation outlook
            </span>
          )}
        </div>
      </div>

      {/* Visual Probability Bar Chart Timeline */}
      <div className="grid grid-cols-6 gap-2.5 sm:gap-4 my-3">
        {timeline.map((item, idx) => {
          const barHeight = Math.max(14, Math.min(100, item.probability));
          const isHigh = item.probability >= 50;

          return (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              <span className={`text-xs font-bold ${isHigh ? 'text-cyan-300' : 'text-slate-400'}`}>
                {item.probability}%
              </span>

              <div className="w-full h-24 sm:h-28 bg-slate-900/80 rounded-2xl p-1.5 flex flex-col justify-end border border-white/5 group-hover:border-white/15 transition-all">
                <div
                  style={{ height: `${barHeight}%` }}
                  className={`w-full rounded-xl transition-all duration-700 ${
                    isHigh
                      ? 'bg-gradient-to-t from-cyan-600 via-sky-500 to-sky-300 shadow-lg shadow-cyan-500/30'
                      : 'bg-gradient-to-t from-slate-700 to-slate-500'
                  }`}
                />
              </div>

              <span className="text-xs font-bold text-slate-200 mt-0.5">{item.time}</span>
              <span className="text-[10px] text-slate-400 font-medium truncate">{item.intensity}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
        <span>Intensity & rainfall rate derived from Doppler radar streams</span>
        <span className="text-cyan-400 font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Real-Time Sync
        </span>
      </div>
    </div>
  );
};
