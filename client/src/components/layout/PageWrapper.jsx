import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { useWeather } from '../../context/WeatherContext';

export const PageWrapper = ({ children, hideSidebar = false }) => {
  const { weatherData } = useWeather();
  const condition = (weatherData?.current?.condition || '').toLowerCase();

  let glowClass = 'ambient-glow-sunny';
  if (condition.includes('rain') || condition.includes('drizzle')) {
    glowClass = 'ambient-glow-rainy';
  } else if (condition.includes('thunder') || condition.includes('storm')) {
    glowClass = 'ambient-glow-storm';
  } else if (condition.includes('cloud') || condition.includes('overcast')) {
    glowClass = 'ambient-glow-cloudy';
  }

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${glowClass} transition-colors duration-300 pb-16 md:pb-0`}>
      <Navbar />
      <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 flex-1 flex gap-6">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 py-4 sm:py-8 min-w-0">{children}</main>
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
};

