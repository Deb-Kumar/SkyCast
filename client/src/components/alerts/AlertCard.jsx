import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const AlertCard = ({ alert }) => {
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'extreme':
        return 'border-purple-500/50 bg-purple-500/10 text-purple-400';
      case 'severe':
        return 'border-rose-500/50 bg-rose-500/10 text-rose-400';
      case 'moderate':
        return 'border-amber-500/50 bg-amber-500/10 text-amber-400';
      default:
        return 'border-sky-500/50 bg-sky-500/10 text-sky-400';
    }
  };

  return (
    <div className={`p-5 rounded-3xl border ${getSeverityStyle(alert.severity)} transition-all duration-300 relative overflow-hidden backdrop-blur-xl`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <h3 className="text-base font-bold text-white">{alert.title}</h3>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white">
          {alert.severity} Risk
        </span>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed mb-3">
        {alert.description}
      </p>

      {/* Safety Instructions Box */}
      <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300 mb-3 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Recommended Action: </span>
          <span>{alert.instruction}</span>
        </div>
      </div>

      {/* Metadata Footers */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          Active: {alert.city}
        </span>
        <span className="text-emerald-400 font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified Anomaly
        </span>
      </div>
    </div>
  );
};
