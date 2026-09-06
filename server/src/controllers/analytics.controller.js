import { fetchWeatherForCoordinates } from '../services/weather.service.js';
import { generateAnalyticsData } from '../services/analytics.service.js';

export const getAnalytics = async (req, res, next) => {
  try {
    const lat = req.query.lat || 22.5726;
    const lon = req.query.lon || 88.3639;
    const range = req.query.range || '7d';

    const { data } = await fetchWeatherForCoordinates(lat, lon);
    const analytics = generateAnalyticsData(data, range);

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        cityName: data.cityName,
        latitude: data.latitude,
        longitude: data.longitude,
        analytics
      }
    });
  } catch (error) {
    next(error);
  }
};
