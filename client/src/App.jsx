import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Forecast } from './pages/Forecast';
import { MapPage } from './pages/MapPage';
import { AirQuality } from './pages/AirQuality';
import { Analytics } from './pages/Analytics';
import { Alerts } from './pages/Alerts';
import { AIWeather } from './pages/AIWeather';
import { Locations } from './pages/Locations';
import { Settings } from './pages/Settings';
import { AboutUs } from './pages/AboutUs';
import { TermsConditions } from './pages/TermsConditions';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CookiePolicy } from './pages/CookiePolicy';
import { ContactUs } from './pages/ContactUs';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forecast" element={<Forecast />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/air-quality" element={<AirQuality />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/ai-weather" element={<AIWeather />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
