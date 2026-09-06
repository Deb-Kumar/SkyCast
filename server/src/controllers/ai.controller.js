import { fetchWeatherForCoordinates } from '../services/weather.service.js';
import { queryWeatherAI } from '../services/gemini.service.js';
import Conversation from '../models/Conversation.js';
import { getDBStatus } from '../config/db.js';

export const handleAIChat = async (req, res, next) => {
  try {
    const { prompt, lat = 22.5726, lon = 88.3639, locationName = 'Current Location', sessionId = 'default-session' } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Prompt query is required.'
      });
    }

    // 1. Fetch live meteorological grounding context for target coordinates
    const { data: weatherData } = await fetchWeatherForCoordinates(lat, lon, { city: locationName });

    // 2. Query Grounded AI Service (Gemini API with Fallback)
    const reply = await queryWeatherAI({
      prompt,
      locationName: weatherData.cityName || locationName,
      weatherData
    });

    const groundedMetrics = {
      temp: weatherData.current?.temperature,
      condition: weatherData.current?.condition,
      rainChance: weatherData.hourly?.[0]?.pop || 0,
      aqi: weatherData.aqi?.aqiValue,
      outdoorScore: weatherData.activityScores?.overall
    };

    // 3. Save conversation if authenticated / database active
    if (getDBStatus() && req.user?._id) {
      try {
        await Conversation.findOneAndUpdate(
          { userId: req.user._id, sessionId },
          {
            $push: {
              messages: [
                { role: 'user', content: prompt, timestamp: new Date() },
                { role: 'model', content: reply, groundedMetrics, timestamp: new Date() }
              ]
            },
            locationName: weatherData.cityName || locationName,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon)
          },
          { upsert: true, new: true }
        );
      } catch (err) {
        console.warn('Failed to persist AI conversation:', err.message);
      }
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        reply,
        groundedMetrics,
        location: weatherData.cityName || locationName
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getConversationHistory = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { sessionId = 'default-session' } = req.query;

    if (getDBStatus() && userId) {
      const convo = await Conversation.findOne({ userId, sessionId });
      return res.status(200).json({
        success: true,
        statusCode: 200,
        data: { conversation: convo }
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: { conversation: null }
    });
  } catch (error) {
    next(error);
  }
};
