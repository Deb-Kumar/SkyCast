import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await authAPI.getMe();
      if (res.data?.success && res.data?.data?.user) {
        setUser(res.data.data.user);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.data?.success && res.data?.data?.user) {
      if (res.data.token) {
        localStorage.setItem('skycast_token', res.data.token);
      }
      setUser(res.data.data.user);
    }
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    if (res.data?.success && res.data?.data?.user) {
      if (res.data.token) {
        localStorage.setItem('skycast_token', res.data.token);
      }
      setUser(res.data.data.user);
    }
    return res.data;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      localStorage.removeItem('skycast_token');
      setUser(null);
    }
  };

  const updatePreferences = async (newPrefs) => {
    try {
      const res = await authAPI.updatePreferences(newPrefs);
      if (res.data?.success && user) {
        setUser((prev) => ({
          ...prev,
          preferences: { ...prev.preferences, ...res.data.data.preferences }
        }));
      }
      return res.data;
    } catch (err) {
      console.warn('Update preferences failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
