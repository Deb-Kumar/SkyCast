import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AIChatDrawer } from '../components/ai/AIChatDrawer';
import { Bot, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const AIWeather = () => {
  const { activeLocation } = useWeather();

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Grounded Meteorological Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            SkyCast Grounded AI Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Zero-hallucination natural language reasoning injected with live sensor feeds for {activeLocation.city}
          </p>
        </div>

        <AIChatDrawer />
      </div>
    </PageWrapper>
  );
};
