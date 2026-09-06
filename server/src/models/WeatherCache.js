import mongoose from 'mongoose';

const weatherCacheSchema = new mongoose.Schema(
  {
    coordKey: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    cityName: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    current: {
      temperature: Number,
      feelsLike: Number,
      condition: String,
      conditionCode: Number,
      icon: String,
      humidity: Number,
      pressure: Number,
      windSpeed: Number,
      windDirection: Number,
      visibility: Number,
      uvIndex: Number,
      cloudCover: Number,
      dewPoint: Number,
      sunrise: String,
      sunset: String,
      isDay: Number
    },
    hourly: [
      {
        time: String,
        temp: Number,
        feelsLike: Number,
        pop: Number, // precipitation probability %
        rain: Number, // mm
        condition: String,
        icon: String,
        windSpeed: Number,
        uvIndex: Number,
        humidity: Number,
        pressure: Number
      }
    ],
    daily: [
      {
        date: String,
        tempMax: Number,
        tempMin: Number,
        pop: Number,
        rain: Number,
        condition: String,
        icon: String,
        sunrise: String,
        sunset: String,
        uvIndex: Number,
        windSpeedMax: Number
      }
    ],
    precipitationTimeline: [
      {
        time: String,
        probability: Number,
        intensity: String,
        amount: Number
      }
    ],
    activityScores: {
      overall: Number,
      football: Number,
      walking: Number,
      riding: Number,
      outdoor: Number,
      photography: Number
    },
    aqi: {
      aqiValue: Number,
      category: String,
      color: String,
      pm25: Number,
      pm10: Number,
      no2: Number,
      co: Number,
      o3: Number,
      so2: Number,
      recommendation: String
    },
    fetchedAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL auto deletion
    }
  },
  { timestamps: true }
);

const WeatherCache = mongoose.models.WeatherCache || mongoose.model('WeatherCache', weatherCacheSchema);
export default WeatherCache;
