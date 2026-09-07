import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const AlertCard = ({ alert }) => {
  const severity = (alert.severity || 'moderate').toLowerCase();

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'extreme':
        return 'border-purple-500/50 bg-gradient-to-br from-purple-950/40 to-slate-900/80 text-purple-400 shadow-lg shadow-purple-950/20';
      case 'severe':
        return 'border-rose-500/50 bg-gradient-to-br from-rose-950/40 to-slate-900/80 text-rose-400 shadow-lg shadow-rose-950/20';
      case 'moderate':
        return 'border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-slate-950/90 text-amber-400 shadow-lg shadow-amber-950/20';
      default:
        return 'border-sky-500/40 bg-gradient-to-br from-sky-950/30 to-slate-900/80 text-sky-400 shadow-lg shadow-sky-950/20';
    }
  };

  const getBadgeStyle = (sev) => {
    switch (sev) {
      case 'extreme':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/20';
      case 'severe':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/20';
      case 'moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20';
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm shadow-sky-500/20';
    }
  };

  const getIconColor = (sev) => {
    switch (sev) {
      case 'extreme':
        return 'text-purple-400';
      case 'severe':
        return 'text-rose-400';
      case 'moderate':
        return 'text-amber-400';
      default:
        return 'text-sky-400';
    }
  };

  return (
    <div className={`p-4 sm:p-5 rounded-3xl border ${getSeverityStyle(severity)} transition-all duration-300 relative overflow-hidden backdrop-blur-xl`}>
      {/* Header with Title and Severity Badge */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 mt-0.5">
            <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 ${getIconColor(severity)}`} />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
            {alert.title}
          </h3>
        </div>

        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 ${getBadgeStyle(severity)}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{alert.severity} Risk</span>
        </span>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed mb-3">
        {alert.description}
      </p>

      {/* Safety Instructions Box */}
      <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 mb-3 flex items-start gap-2.5 shadow-inner">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white font-semibold">Recommended Action: </strong>
          <span>{alert.instruction}</span>
        </div>
      </div>

      {/* Metadata Footers */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2.5 border-t border-white/10">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Active: {alert.city}</span>
        </span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified Anomaly</span>
        </span>
      </div>
    </div>
  );
};
