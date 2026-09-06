import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudLightning,
  Zap,
  Wind
} from 'lucide-react';

export const getWeatherIcon = (iconName, className = 'w-6 h-6 text-sky-400') => {
  switch (iconName) {
    case 'Sun':
      return <Sun className={`${className} text-amber-400 animate-spin-slow`} />;
    case 'SunMedium':
      return <SunMedium className={`${className} text-amber-300`} />;
    case 'CloudSun':
      return <CloudSun className={`${className} text-amber-200`} />;
    case 'Cloud':
      return <Cloud className={`${className} text-slate-300`} />;
    case 'CloudFog':
      return <CloudFog className={`${className} text-slate-400`} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={`${className} text-cyan-300`} />;
    case 'CloudRain':
      return <CloudRain className={`${className} text-cyan-400`} />;
    case 'CloudRainWind':
      return <CloudRainWind className={`${className} text-blue-400`} />;
    case 'CloudSnow':
      return <CloudSnow className={`${className} text-sky-200`} />;
    case 'CloudLightning':
    case 'Zap':
      return <Zap className={`${className} text-purple-400 animate-pulse`} />;
    default:
      return <CloudSun className={`${className} text-sky-400`} />;
  }
};
