import { fetchWeatherForCoordinates } from '../services/weather.service.js';

export const getCurrentAQI = async (req, res, next) => {
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
        aqi: data.aqi
      }
    });
  } catch (error) {
    next(error);
  }
};
