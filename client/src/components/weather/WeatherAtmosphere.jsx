import React, { useMemo } from 'react';

export const WeatherAtmosphere = ({ condition = '', icon = '' }) => {
  const cond = (condition || '').toLowerCase();
  const iconCode = (icon || '').toLowerCase();

  const isThunder = cond.includes('thunder') || cond.includes('storm') || iconCode.includes('thunder');
  const isRain = !isThunder && (cond.includes('rain') || cond.includes('drizzle') || cond.includes('shower') || iconCode.includes('rain'));
  const isSnow = cond.includes('snow') || cond.includes('sleet') || cond.includes('ice') || iconCode.includes('snow');
  const isCloudy = !isThunder && !isRain && !isSnow && (cond.includes('cloud') || cond.includes('overcast') || cond.includes('fog') || cond.includes('mist') || iconCode.includes('cloud'));
  const isSunny = !isThunder && !isRain && !isSnow && !isCloudy && (cond.includes('clear') || cond.includes('sun') || iconCode.includes('sun'));

  // Generate randomized raindrops
  const raindrops = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.8 + Math.random() * 2)}%`,
      delay: `${(Math.random() * 2).toFixed(2)}s`,
      duration: `${(0.65 + Math.random() * 0.45).toFixed(2)}s`,
      opacity: (0.4 + Math.random() * 0.5).toFixed(2)
    }));
  }, []);

  // Generate randomized snowflakes
  const snowflakes = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.5 + Math.random() * 3)}%`,
      size: `${Math.floor(Math.random() * 4 + 3)}px`,
      delay: `${(Math.random() * 3).toFixed(2)}s`,
      duration: `${(2.2 + Math.random() * 2).toFixed(2)}s`,
      opacity: (0.5 + Math.random() * 0.5).toFixed(2)
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl z-0">
      {/* 1. THUNDERSTORM ANIMATION */}
      {isThunder && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-slate-950/30 to-indigo-950/40" />
          <div className="lightning-layer" />
          {raindrops.map((r) => (
            <div
              key={r.id}
              className="raindrop"
              style={{
                left: r.left,
                animationDelay: r.delay,
                animationDuration: r.duration,
                opacity: r.opacity
              }}
            />
          ))}
          <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl" />
        </>
      )}

      {/* 2. RAIN / DRIZZLE ANIMATION */}
      {isRain && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 via-slate-950/30 to-blue-950/30" />
          {raindrops.map((r) => (
            <div
              key={r.id}
              className="raindrop"
              style={{
                left: r.left,
                animationDelay: r.delay,
                animationDuration: r.duration,
                opacity: r.opacity
              }}
            />
          ))}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />
        </>
      )}

      {/* 3. CLOUDY / OVERCAST / FOG ANIMATION */}
      {isCloudy && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-950/20" />
          {/* Drifting Volumetric Cloud Layers */}
          <div className="absolute -top-6 -left-12 w-[140%] h-48 opacity-25 cloud-layer-1">
            <svg viewBox="0 0 1000 300" className="w-full h-full fill-slate-300">
              <path d="M 150,220 C 120,220 90,200 90,170 C 90,140 120,120 150,120 C 160,120 170,123 180,128 C 195,95 235,70 280,70 C 335,70 380,105 390,150 C 400,145 415,140 430,140 C 465,140 495,165 495,200 C 495,205 493,213 490,220 Z" />
              <path d="M 600,240 C 570,240 540,220 540,190 C 540,160 570,140 600,140 C 610,140 620,143 630,148 C 645,115 685,90 730,90 C 785,90 830,125 840,170 C 850,165 865,160 880,160 C 915,160 945,185 945,220 C 945,225 943,233 940,240 Z" />
            </svg>
          </div>
          <div className="absolute top-8 -right-12 w-[130%] h-44 opacity-20 cloud-layer-2">
            <svg viewBox="0 0 1000 300" className="w-full h-full fill-sky-200">
              <path d="M 300,230 C 270,230 240,210 240,180 C 240,150 270,130 300,130 C 310,130 320,133 330,138 C 345,105 385,80 430,80 C 485,80 530,115 540,160 C 550,155 565,150 580,150 C 615,150 645,175 645,210 C 645,215 643,223 640,230 Z" />
            </svg>
          </div>
          <div className="absolute -top-10 right-10 w-80 h-80 rounded-full bg-slate-400/10 blur-3xl" />
        </>
      )}

      {/* 4. SNOW / SLEET ANIMATION */}
      {isSnow && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-slate-950/20 to-sky-950/30" />
          {snowflakes.map((s) => (
            <div
              key={s.id}
              className="snowflake"
              style={{
                left: s.left,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
                animationDuration: s.duration,
                opacity: s.opacity
              }}
            />
          ))}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sky-200/10 blur-3xl" />
        </>
      )}

      {/* 5. CLEAR / SUNNY RADIAL GLOW */}
      {isSunny && (
        <>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl animate-pulse" />
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-yellow-400/10 blur-2xl" />
        </>
      )}
    </div>
  );
};
