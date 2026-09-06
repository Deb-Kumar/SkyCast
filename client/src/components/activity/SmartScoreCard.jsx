import React from 'react';
import { Trophy, Activity, Footprints, Bike, Camera, ShieldCheck } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

export const SmartScoreCard = () => {
  const { weatherData } = useWeather();
  const scores = weatherData?.activityScores || {
    overall: 80,
    football: 75,
    walking: 90,
    riding: 70,
    photography: 85
  };

  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', bar: 'bg-emerald-500' };
    if (score >= 60) return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', bar: 'bg-amber-500' };
    if (score >= 40) return { text: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/30', bar: 'bg-orange-500' };
    return { text: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/30', bar: 'bg-rose-500' };
  };

  const getScoreVerdict = (score) => {
    if (score >= 80) return 'Optimal Conditions';
    if (score >= 60) return 'Good Feasibility';
    if (score >= 40) return 'Fair / Caution';
    return 'Unfavorable Weather';
  };

  const activities = [
    { name: 'Football / Sports', score: scores.football, icon: Trophy, desc: 'Grass slickness & thermal load' },
    { name: 'Walking & Running', score: scores.walking, icon: Footprints, desc: 'AQI & breathing comfort' },
    { name: 'Riding / Cycling', score: scores.riding, icon: Bike, desc: 'Wind resistance & rain' },
    { name: 'Photography', score: scores.photography, icon: Camera, desc: 'Lighting & atmospheric clarity' }
  ];

  const overallTheme = getScoreColor(scores.overall);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-sky-500/20 text-emerald-400 border border-emerald-500/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Smart Activity Score</h2>
              <p className="text-[11px] text-slate-400">Multi-factor meteorological feasibility</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Proprietary
          </span>
        </div>

        {/* Master Circular Outdoor Score */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/5 mb-4">
          <div className="relative flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0">
            <svg className="w-16 h-16 sm:w-18 sm:h-18 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                className={`${overallTheme.text} transition-all duration-1000`}
                strokeDasharray="163"
                strokeDashoffset={163 - (163 * scores.overall) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-xl sm:text-2xl font-black text-white tracking-tight">
              {scores.overall}
            </span>
          </div>

          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Outdoor General Score
            </span>
            <h3 className={`text-base font-bold ${overallTheme.text} mt-0.5 truncate`}>
              {getScoreVerdict(scores.overall)}
            </h3>
            <p className="text-[11px] text-slate-400 leading-snug mt-0.5 line-clamp-2">
              Thermal index, rain risk, wind velocity, UV, and AQI.
            </p>
          </div>
        </div>

        {/* Breakdown Sub-Scores in Clean Full-Width Stacked Rows */}
        <div className="space-y-2.5">
          {activities.map((act) => {
            const Icon = act.icon;
            const theme = getScoreColor(act.score);
            return (
              <div
                key={act.name}
                className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-white/5 text-slate-300 flex-shrink-0">
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{act.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{act.desc}</p>
                  </div>
                </div>

                <div className={`px-2.5 py-1 rounded-xl border text-xs font-extrabold flex-shrink-0 ${theme.bg} ${theme.border} ${theme.text}`}>
                  {act.score}/100
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          Auto Evaluated
        </span>
        <span className="font-semibold text-slate-300">Score Range 0 - 100</span>
      </div>
    </div>
  );
};
