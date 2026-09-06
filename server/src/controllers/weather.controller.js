import { fetchWeatherForCoordinates } from '../services/weather.service.js';

export const getCurrentWeather = async (req, res, next) => {
  try {
    const lat = req.query.lat || 22.5726; // Default to Kolkata coordinates if unspecified
    const lon = req.query.lon || 88.3639;
    const city = req.query.city || '';
    const state = req.query.state || '';
    const country = req.query.country || '';

    const { data, fromCache } = await fetchWeatherForCoordinates(lat, lon, { city, state, country });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Weather data retrieved successfully',
      cached: fromCache,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getHourlyForecast = async (req, res, next) => {
  try {
    const lat = req.query.lat || 22.5726;
    const lon = req.query.lon || 88.3639;

    const { data, fromCache } = await fetchWeatherForCoordinates(lat, lon);

    res.status(200).json({
      success: true,
      statusCode: 200,
      cached: fromCache,
      data: {
        cityName: data.cityName,
        latitude: data.latitude,
        longitude: data.longitude,
        hourly: data.hourly
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getDailyForecast = async (req, res, next) => {
  try {
    const lat = req.query.lat || 22.5726;
    const lon = req.query.lon || 88.3639;
    const days = parseInt(req.query.days) || 7;

    const { data, fromCache } = await fetchWeatherForCoordinates(lat, lon);

    res.status(200).json({
      success: true,
      statusCode: 200,
      cached: fromCache,
      data: {
        cityName: data.cityName,
        latitude: data.latitude,
        longitude: data.longitude,
        daily: data.daily.slice(0, days)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPrecipitationTimeline = async (req, res, next) => {
  try {
    const lat = req.query.lat || 22.5726;
    const lon = req.query.lon || 88.3639;

    const { data, fromCache } = await fetchWeatherForCoordinates(lat, lon);

    res.status(200).json({
      success: true,
      statusCode: 200,
      cached: fromCache,
      data: {
        cityName: data.cityName,
        precipitationTimeline: data.precipitationTimeline
      }
    });
  } catch (error) {
    next(error);
  }
};
