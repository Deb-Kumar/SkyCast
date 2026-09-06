import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AQICard } from '../components/aqi/AQICard';
import {
  Wind,
  ShieldAlert,
  HeartPulse,
  Activity,
  Layers,
  Info,
  Flame,
  Factory,
  Car,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const AQI_LEVELS = [
  {
    range: '0 – 50',
    min: 0,
    max: 50,
    name: 'Good',
    color: 'emerald',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    indicatorClass: 'bg-emerald-500',
    description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
    advice: 'Ideal for all outdoor sports, workouts, and ventilation.'
  },
  {
    range: '51 – 100',
    min: 51,
    max: 100,
    name: 'Moderate',
    color: 'amber',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    indicatorClass: 'bg-amber-400',
    description: 'Air quality is acceptable; however, some pollutants may pose a moderate concern for sensitive people.',
    advice: 'Unusually sensitive individuals should consider limiting prolonged outdoor exertion.'
  },
  {
    range: '101 – 150',
    min: 101,
    max: 150,
    name: 'Unhealthy for Sensitive Groups',
    color: 'orange',
    badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    indicatorClass: 'bg-orange-500',
    description: 'Members of sensitive groups (children, seniors, asthmatics) may experience health effects.',
    advice: 'Children, elderly, and respiratory patients should reduce heavy outdoor exertion.'
  },
  {
    range: '151 – 200',
    min: 151,
    max: 200,
    name: 'Unhealthy',
    color: 'rose',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    indicatorClass: 'bg-rose-500',
    description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects.',
    advice: 'Everyone should reduce prolonged outdoor exertion. Consider wearing N95 masks.'
  },
  {
    range: '201 – 300',
    min: 201,
    max: 300,
    name: 'Very Unhealthy',
    color: 'purple',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    indicatorClass: 'bg-purple-500',
    description: 'Health alert: The risk of health effects is increased for everyone across the population.',
    advice: 'Avoid outdoor activities. Close windows and run indoor HEPA air purifiers.'
  },
  {
    range: '301 – 500',
    min: 301,
    max: 500,
    name: 'Hazardous',
    color: 'red',
    badgeClass: 'bg-red-950 text-red-200 border-red-700/50',
    indicatorClass: 'bg-red-700',
    description: 'Health warning of emergency conditions: Everyone is more likely to be severely affected.',
    advice: 'Mandatory stay indoors. Avoid all physical outdoor exposure.'
  }
];

const POLLUTANT_COMPONENTS = [
  {
    code: 'PM2.5',
    name: 'Fine Particulate Matter',
    size: '≤ 2.5 micrometers (30x thinner than human hair)',
    icon: Wind,
    iconColor: 'text-sky-400',
    bgColor: 'bg-sky-500/10 border-sky-500/20',
    sources: 'Vehicle exhaust, power plants, forest fires, agricultural stubble burning, cooking.',
    impact: 'Penetrates deep into lung alveoli and enters the bloodstream, causing cardiovascular stress, asthma, and reduced lung capacity.',
    standard: 'WHO Guideline: 15 µg/m³ (24-hour average)'
  },
  {
    code: 'PM10',
    name: 'Coarse Inhalable Particles',
    size: '≤ 10 micrometers (dust, pollen, spores)',
    icon: Layers,
    iconColor: 'text-teal-400',
    bgColor: 'bg-teal-500/10 border-teal-500/20',
    sources: 'Road dust, construction sites, cement factories, wind-blown soil, industrial crushing.',
    impact: 'Irritates eyes, nose, and upper respiratory tract, leading to coughing, sneezing, and bronchitis flare-ups.',
    standard: 'WHO Guideline: 45 µg/m³ (24-hour average)'
  },
  {
    code: 'NO₂',
    name: 'Nitrogen Dioxide',
    size: 'Toxic reddish-brown reactive gas',
    icon: Car,
    iconColor: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10 border-indigo-500/20',
    sources: 'High-temperature fuel combustion in diesel/petrol cars, industrial boilers, power stations.',
    impact: 'Causes airway inflammation, increases bronchial reactivity in asthmatics, and acts as a primary precursor for ground ozone and acid rain.',
    standard: 'WHO Guideline: 25 µg/m³ (24-hour average)'
  },
  {
    code: 'CO',
    name: 'Carbon Monoxide',
    size: 'Colorless, odorless asphyxiant gas',
    icon: Flame,
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    sources: 'Incomplete combustion in motor vehicles, faulty heaters, gas stoves, burning biomass.',
    impact: 'Binds with blood hemoglobin (forming carboxyhemoglobin), reducing oxygen delivery to vital organs like the heart and brain.',
    standard: 'WHO Guideline: 4 mg/m³ (24-hour average)'
  },
  {
    code: 'O₃',
    name: 'Ground-Level Ozone',
    size: 'Secondary photochemical pollutant',
    icon: Sparkles,
    iconColor: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/20',
    sources: 'Chemical reactions between NOx and Volatile Organic Compounds (VOCs) under strong sunlight and heat.',
    impact: 'Triggers chest tightness, shortness of breath, lung airway constriction, and agricultural crop damage on sunny afternoons.',
    standard: 'WHO Guideline: 100 µg/m³ (8-hour average)'
  },
  {
    code: 'SO₂',
    name: 'Sulphur Dioxide',
    size: 'Pungent, irritating gas',
    icon: Factory,
    iconColor: 'text-rose-400',
    bgColor: 'bg-rose-500/10 border-rose-500/20',
    sources: 'Coal combustion in power generation, oil refineries, metal smelting, chemical manufacturing.',
    impact: 'Rapidly triggers bronchoconstriction and eye irritation; dissolves in atmospheric moisture to form acid precipitation.',
    standard: 'WHO Guideline: 40 µg/m³ (24-hour average)'
  }
];

export const AirQuality = () => {
  const { activeLocation, weatherData } = useWeather();
  const currentAqi = weatherData?.aqi?.usAqi || 113;

  return (
    <PageWrapper>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Page Title */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Live Atmospheric Chemistry & Health Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Air Quality Intelligence • {activeLocation.city}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time atmospheric pollutant concentrations (PM2.5, PM10, NO₂, CO, O₃, SO₂), index classification scales, and pollutant composition guides.
          </p>
        </div>

        {/* 1. Live AQI Metrics Card */}
        <AQICard />

        {/* 2. Air Quality Index (AQI) Levels & Scale Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                Air Quality Index (AQI) Levels & Classification Scale
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Standard US-EPA & WHO meteorological air health benchmarks with real-time index mapping
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
              Current Station AQI: <strong className="text-sky-400">{currentAqi}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AQI_LEVELS.map((lvl) => {
              const isCurrent = currentAqi >= lvl.min && currentAqi <= lvl.max;
              return (
                <div
                  key={lvl.name}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-slate-900/90 border-sky-500 shadow-xl shadow-sky-500/10 ring-2 ring-sky-500/30'
                      : 'bg-slate-900/50 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Active Station Banner if currently active */}
                    {isCurrent && (
                      <div className="px-2.5 py-1 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 text-[11px] font-bold flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                          Current Station Reading
                        </span>
                        <span className="font-mono">{currentAqi} AQI</span>
                      </div>
                    )}

                    {/* Range & Category Badge Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${lvl.indicatorClass} flex-shrink-0 shadow-sm`} />
                        <span className="text-xs font-mono font-bold text-white tracking-wide">{lvl.range}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lvl.badgeClass}`}>
                        {lvl.name}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lvl.description}
                    </p>
                  </div>

                  <div className="pt-2.5 mt-3 border-t border-white/5 text-[11px] text-slate-400">
                    <strong className="text-slate-300">Action:</strong> {lvl.advice}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. About All Pollutant Components in Card Format */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-400" />
              About Atmospheric Pollutant Components
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive scientific breakdown of chemical origin, physical characteristics, and physiological health impacts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {POLLUTANT_COMPONENTS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.code}
                  className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-2xl ${p.bgColor}`}>
                          <Icon className={`w-5 h-5 ${p.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-white tracking-tight">{p.code}</h3>
                          <p className="text-[11px] font-medium text-slate-400">{p.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-sky-300/80 bg-slate-950/60 px-2.5 py-1 rounded-xl border border-white/5">
                      {p.size}
                    </div>

                    {/* Primary Sources */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Sources</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {p.sources}
                      </p>
                    </div>

                    {/* Health Impact */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Health Hazard</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {p.impact}
                      </p>
                    </div>
                  </div>

                  {/* Threshold Standard */}
                  <div className="pt-3 border-t border-white/10 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{p.standard}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Sensitive Group Recommendations */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-400" />
            Medical & Sensitive Population Recommendations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
              <h3 className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                Children & Elderly
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Limit intense outdoor sports if AQI exceeds 100. Respiratory systems in growing children are more vulnerable to fine PM2.5 particles.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Asthma & Bronchitis Patients
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Keep prescribed inhalers accessible. Avoid morning jogs during temperature inversions when particulate matter concentrates near the ground.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
              <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                General Public & Athletes
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Optimal breathing windows are during afternoon wind dispersion. Wear N95 filtration masks if AQI surges above 150.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
