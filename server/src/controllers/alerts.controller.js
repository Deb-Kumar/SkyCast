import { fetchWeatherForCoordinates } from '../services/weather.service.js';
import { detectSevereAlerts } from '../services/alert.service.js';

export const getActiveAlerts = async (req, res, next) => {
  try {
    const lat = req.query.lat || 22.5726;
    const lon = req.query.lon || 88.3639;
    const city = req.query.city || 'Current Location';

    const { data } = await fetchWeatherForCoordinates(lat, lon, { city });
    const alerts = detectSevereAlerts(data, data.cityName || city);

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        totalAlerts: alerts.length,
        alerts
      }
    });
  } catch (error) {
    next(error);
  }
};
