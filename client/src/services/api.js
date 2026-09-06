import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/v1` 
  : '/api/v1';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach Authorization Bearer token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skycast_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const weatherAPI = {
  getCurrent: (lat, lon, city) => api.get('/weather/current', { params: { lat, lon, city } }),
  getHourly: (lat, lon) => api.get('/weather/hourly', { params: { lat, lon } }),
  getDaily: (lat, lon, days = 7) => api.get('/weather/daily', { params: { lat, lon, days } }),
  getPrecipitation: (lat, lon) => api.get('/weather/precipitation', { params: { lat, lon } })
};

export const locationAPI = {
  search: (query) => api.get('/locations/search', { params: { q: query } }),
  reverse: (lat, lon) => api.get('/locations/reverse', { params: { lat, lon } }),
  getSaved: () => api.get('/locations'),
  addSaved: (data) => api.post('/locations', data),
  deleteSaved: (id) => api.delete(`/locations/${id}`)
};

export const aqiAPI = {
  getCurrent: (lat, lon) => api.get('/air-quality/current', { params: { lat, lon } })
};

export const alertsAPI = {
  getActive: (lat, lon, city) => api.get('/alerts/active', { params: { lat, lon, city } })
};

export const analyticsAPI = {
  getTrends: (lat, lon, range = '7d') => api.get('/analytics/trends', { params: { lat, lon, range } })
};

export const aiAPI = {
  chat: (data) => api.post('/ai/chat', data),
  getConversations: (sessionId) => api.get('/ai/conversations', { params: { sessionId } })
};

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updatePreferences: (data) => api.put('/auth/preferences', data),
  updatePassword: (data) => api.put('/auth/password', data)
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data)
};

export default api;
