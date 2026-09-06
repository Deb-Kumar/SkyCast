import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { weatherAPI, locationAPI } from '../services/api';
import { useAuth } from './AuthContext';

export const DEFAULT_LOCATION = {
  city: 'Kolkata',
  state: 'West Bengal',
  country: 'India',
  latitude: 22.5726,
  longitude: 88.3639,
  displayName: 'Kolkata, West Bengal, India'
};

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const { user } = useAuth();

  const [activeLocation, setActiveLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('skycast_active_loc');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_LOCATION;
  });

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState(null);

  // Units
  const [tempUnit, setTempUnit] = useState('C');
  const [windUnit, setWindUnit] = useState('kmh');
  const [timeFormat, setTimeFormat] = useState('12h');

  // Synchronize unit preferences from user profile if signed in
  useEffect(() => {
    if (user?.preferences) {
      if (user.preferences.temperatureUnit) setTempUnit(user.preferences.temperatureUnit);
      if (user.preferences.windSpeedUnit) setWindUnit(user.preferences.windSpeedUnit);
      if (user.preferences.timeFormat) setTimeFormat(user.preferences.timeFormat);
    }
  }, [user]);

  // Persist active location changes
  useEffect(() => {
    if (activeLocation) {
      localStorage.setItem('skycast_active_loc', JSON.stringify(activeLocation));
    }
  }, [activeLocation]);

  const fetchWeather = useCallback(async (loc = activeLocation) => {
    if (!loc || !loc.latitude || !loc.longitude) return;
    setLoading(true);
    setError(null);
    try {
      const res = await weatherAPI.getCurrent(loc.latitude, loc.longitude, loc.city);
      if (res.data?.success && res.data?.data) {
        setWeatherData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load weather:', err);
      setError('Unable to fetch live weather. Please check connection or retry.');
    } finally {
      setLoading(false);
      setLocating(false);
    }
  }, [activeLocation]);

  useEffect(() => {
    if (activeLocation) {
      fetchWeather(activeLocation);
    }
  }, [activeLocation, fetchWeather]);

  const isManuallySelected = useRef(false);

  // Select new location
  const selectLocation = useCallback((newLoc) => {
    if (!newLoc) return;
    isManuallySelected.current = true;
    setLoading(true);
    setActiveLocation(newLoc);
    localStorage.setItem('skycast_active_loc', JSON.stringify(newLoc));
    fetchWeather(newLoc);
  }, [fetchWeather]);

  // Search by direct query string (e.g. on Enter key press)
  const searchAndSelectLocation = async (query) => {
    if (!query || !query.trim()) return;
    setLoading(true);
    try {
      const res = await locationAPI.search(query.trim());
      const results = res.data?.data?.results || [];
      if (results.length > 0) {
        selectLocation(results[0]);
        return results[0];
      }
    } catch (e) {
      console.warn('Search query error:', e);
      setLoading(false);
    }
    return null;
  };

  // Browser Geolocation Detector with Active Permission Re-Prompting & Fallback
  const useCurrentLocation = async (silent = false) => {
    if (!silent) {
      isManuallySelected.current = false;
    }
    setLocating(true);
    setLoading(true);

    // Check permissions if supported
    if (navigator.permissions && navigator.permissions.query) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        if (permissionStatus.state === 'denied' && !silent) {
          alert('Location permission is currently blocked in your browser. Please click the icon in your address bar to allow location access, or choose your city manually.');
        }
      } catch (e) {
        // Permission API not supported for geolocation query in some environments
      }
    }

    if (!navigator.geolocation) {
      if (!silent) {
        alert('Geolocation is not supported by your browser. Defaulting to Kolkata.');
      }
      fallbackIPLocation(silent);
      return;
    }

    // Force prompt by specifying maximumAge: 0 and high accuracy
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        if (silent && isManuallySelected.current) return;
        const { latitude, longitude } = pos.coords;
        try {
          const revRes = await locationAPI.reverse(latitude, longitude);
          if (silent && isManuallySelected.current) return;
          if (revRes.data?.success && revRes.data?.data) {
            const { city, state, country, displayName } = revRes.data.data;
            const newLoc = {
              city: city || 'Your Area',
              state: state || '',
              country: country || '',
              latitude,
              longitude,
              displayName: displayName || `${city || 'Your Area'}, ${country || ''}`
            };
            selectLocation(newLoc);
            return;
          }
        } catch (e) {
          console.warn('Reverse geocoding error:', e);
        }

        if (silent && isManuallySelected.current) return;
        const fallbackLoc = {
          city: 'Current Location',
          state: '',
          country: '',
          latitude,
          longitude,
          displayName: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`
        };
        selectLocation(fallbackLoc);
      },
      (err) => {
        if (silent && isManuallySelected.current) return;
        if (!silent) {
          if (err.code === 1) {
            // PERMISSION_DENIED
            alert('Location access was denied. Please allow location permission in your browser or search for your city.');
          } else if (err.code === 2) {
            // POSITION_UNAVAILABLE
            alert('Location is currently unavailable. Using network location or Kolkata default.');
          } else if (err.code === 3) {
            // TIMEOUT
            alert('Location request timed out. Trying network fallback.');
          }
        }
        fallbackIPLocation(silent);
      },
      { maximumAge: 0, timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Fallback to IP geolocation or Kolkata if GPS is unavailable/denied
  const fallbackIPLocation = async (silent = false) => {
    if (silent && isManuallySelected.current) return;
    try {
      const res = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client');
      const data = await res.json();
      if (silent && isManuallySelected.current) return;
      if (data && data.latitude && data.longitude) {
        const localCity = data.locality || data.city || data.principalSubdivision || 'Kolkata';
        const newLoc = {
          city: localCity,
          state: data.principalSubdivision || 'West Bengal',
          country: data.countryName || 'India',
          latitude: data.latitude,
          longitude: data.longitude,
          displayName: `${localCity}${data.principalSubdivision ? `, ${data.principalSubdivision}` : ''}, ${data.countryName || 'India'}`
        };
        setActiveLocation(newLoc);
        return;
      }
    } catch (e) {
      console.warn('IP fallback failed, using Kolkata default:', e);
    } finally {
      if (!activeLocation) {
        setActiveLocation(DEFAULT_LOCATION);
      }
      setLocating(false);
      setLoading(false);
    }
  };

  // On first visit, automatically detect real location dynamically
  useEffect(() => {
    if (!activeLocation) {
      useCurrentLocation(true);
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        activeLocation,
        weatherData,
        loading,
        locating,
        error,
        tempUnit,
        setTempUnit,
        windUnit,
        setWindUnit,
        timeFormat,
        setTimeFormat,
        selectLocation,
        searchAndSelectLocation,
        fetchWeather,
        useCurrentLocation
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
