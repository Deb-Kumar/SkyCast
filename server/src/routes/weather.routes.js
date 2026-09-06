import { Router } from 'express';
import {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
  getPrecipitationTimeline
} from '../controllers/weather.controller.js';

const router = Router();

router.get('/', getCurrentWeather);
router.get('/current', getCurrentWeather);
router.get('/hourly', getHourlyForecast);
router.get('/daily', getDailyForecast);
router.get('/precipitation', getPrecipitationTimeline);

export default router;
