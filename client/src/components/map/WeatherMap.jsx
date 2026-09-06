import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Layers, CloudRain, Thermometer, Wind, Cloud, Radio } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

// Custom glowing location marker
const customIcon = L.divIcon({
  className: 'custom-weather-marker',
  html: `<div style="background-color: #0284c7; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px #38bdf8;"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

// Component to dynamically re-center map when activeLocation changes
const ChangeMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

export const WeatherMap = ({ height = '500px' }) => {
  const { activeLocation, weatherData } = useWeather();
  const [activeLayer, setActiveLayer] = useState('rain'); // 'rain' | 'clouds' | 'satellite' | 'street'
  const [radarPath, setRadarPath] = useState(null);

  const center = [activeLocation.latitude || 22.5726, activeLocation.longitude || 88.3639];

  // Fetch the latest real-time RainViewer radar tile timestamp
  useEffect(() => {
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then((res) => res.json())
      .then((data) => {
        const latest = data.radar?.past?.slice(-1)[0];
        if (latest && data.host) {
          setRadarPath(`${data.host}${latest.path}/256/{z}/{x}/{y}/2/1_1.png`);
        }
      })
      .catch((err) => console.warn('RainViewer fetch error:', err));
  }, []);

  const layers = [
    { id: 'rain', name: 'Live Precipitation Radar', icon: CloudRain, color: 'text-cyan-400' },
    { id: 'satellite', name: 'Satellite Imagery', icon: Layers, color: 'text-emerald-400' },
    { id: 'clouds', name: 'Cloud Coverage', icon: Cloud, color: 'text-sky-300' },
    { id: 'dark', name: 'Dark Cartography', icon: Wind, color: 'text-indigo-400' }
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-col gap-4">
      {/* Header & Layer Toggle Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Interactive Weather Radar Map</h2>
              <p className="text-[11px] text-slate-400">High-resolution Doppler radar & dark cartography</p>
            </div>
          </div>
        </div>

        {/* Layer Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {layers.map((l) => {
            const Icon = l.icon;
            const isSelected = activeLayer === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setActiveLayer(l.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : l.color}`} />
                <span>{l.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Viewport */}
      <div style={{ height }} className="w-full rounded-2xl overflow-hidden border border-white/10 relative z-10 shadow-2xl">
        <MapContainer center={center} zoom={7} scrollWheelZoom={false} className="w-full h-full">
          <ChangeMapView center={center} />

          {/* Base Layer: ESRI World Dark Gray Canvas (Clean, free, dark, zero watermarks) */}
          {activeLayer === 'satellite' ? (
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          ) : (
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>, OpenStreetMap'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            />
          )}

          {/* Real-Time Doppler Precipitation Radar Layer */}
          {activeLayer === 'rain' && radarPath && (
            <TileLayer
              url={radarPath}
              opacity={0.75}
              zIndex={300}
            />
          )}

          {/* Cloud Cover Layer */}
          {activeLayer === 'clouds' && (
            <TileLayer
              url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=88888888888888888888888888888888"
              opacity={0.5}
              zIndex={200}
            />
          )}

          {/* Location Marker */}
          <Marker position={center} icon={customIcon}>
            <Popup className="skycast-popup">
              <div className="p-1 text-slate-900 text-xs font-sans">
                <p className="font-bold text-sm text-sky-800">{activeLocation.city || 'Selected Location'}</p>
                <p className="text-slate-600 mt-0.5">Temp: <span className="font-semibold text-slate-900">{weatherData?.current?.temperature || 28}°C</span></p>
                <p className="text-slate-600">Condition: <span className="font-semibold text-slate-900">{weatherData?.current?.condition || 'Clear'}</span></p>
                <p className="text-slate-600">Rain Prob: <span className="font-semibold text-sky-600">{weatherData?.hourly?.[0]?.pop || 0}%</span></p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Legend Box */}
        <div className="absolute bottom-4 left-4 z-[400] bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs text-slate-200 shadow-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <p className="font-bold text-[11px] uppercase tracking-wider text-slate-300">
              {layers.find((l) => l.id === activeLayer)?.name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Light</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Moderate</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Heavy / Storm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
