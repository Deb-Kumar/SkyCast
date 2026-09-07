import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AlertCard } from '../components/alerts/AlertCard';
import { ShieldAlert, Bell, CheckCircle2, Loader2 } from 'lucide-react';
import { alertsAPI } from '../services/api';
import { useWeather } from '../context/WeatherContext';

export const Alerts = () => {
  const { activeLocation } = useWeather();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        const res = await alertsAPI.getActive(activeLocation.latitude, activeLocation.longitude, activeLocation.city);
        if (res.data?.success) {
          setAlerts(res.data.data.alerts || []);
        }
      } catch (err) {
        console.error('Failed to load alerts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, [activeLocation]);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
              Severe Weather Alerts & Warnings • {activeLocation.city}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Automated anomaly detection engine for thunderstorms, heatwaves, cyclones, and hazardous AQI
            </p>
          </div>

          <div className="flex justify-center sm:justify-end">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              Active Warning Engine
            </span>
          </div>
        </div>

        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          </div>
        ) : alerts.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">No Active Meteorological Hazards</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              No extreme weather alerts or anomalies are currently active for {activeLocation.city}. Atmospheric parameters are within normal seasonal thresholds.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert) => (
              <AlertCard key={alert.id || alert.title} alert={alert} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
