export const calculateAQICategory = (aqiValue) => {
  if (aqiValue <= 50) {
    return {
      category: 'Good',
      color: '#10B981',
      recommendation: 'Air quality is satisfactory. Enjoy outdoor activities with optimal breathing conditions.'
    };
  } else if (aqiValue <= 100) {
    return {
      category: 'Moderate',
      color: '#FBBF24',
      recommendation: 'Air quality is acceptable. Very sensitive individuals should consider reducing prolonged outdoor exertion.'
    };
  } else if (aqiValue <= 150) {
    return {
      category: 'Unhealthy for Sensitive Groups',
      color: '#F97316',
      recommendation: 'Members of sensitive groups (children, elderly, asthma patients) may experience health effects.'
    };
  } else if (aqiValue <= 200) {
    return {
      category: 'Unhealthy',
      color: '#EF4444',
      recommendation: 'Everyone may begin to experience health effects; sensitive groups should avoid outdoor activities.'
    };
  } else if (aqiValue <= 300) {
    return {
      category: 'Very Unhealthy',
      color: '#8B5CF6',
      recommendation: 'Health alert: The risk of health effects is increased for everyone. Wear N95 masks outdoors.'
    };
  } else {
    return {
      category: 'Hazardous',
      color: '#881337',
      recommendation: 'Emergency warning: Entire population is more likely to be affected. Avoid all outdoor exertion.'
    };
  }
};

export const normalizeAQIData = (airData) => {
  const current = airData.current || {};
  const pm25 = current.pm2_5 || current.pm25 || 28;
  const pm10 = current.pm10 || 45;
  const no2 = current.nitrogen_dioxide || current.no2 || 16;
  const co = current.carbon_monoxide ? (current.carbon_monoxide / 1000).toFixed(2) : 0.4;
  const o3 = current.ozone || current.o3 || 38;
  const so2 = current.sulphur_dioxide || current.so2 || 6;

  // Approximate US-EPA AQI from PM2.5
  let aqiValue = Math.round(pm25 * 3.5);
  if (airData.current?.us_aqi) aqiValue = airData.current.us_aqi;
  else if (airData.current?.european_aqi) aqiValue = Math.round(airData.current.european_aqi * 2.2);

  aqiValue = Math.max(15, Math.min(500, aqiValue || 65));
  const { category, color, recommendation } = calculateAQICategory(aqiValue);

  return {
    aqiValue,
    category,
    color,
    pm25: Number(pm25),
    pm10: Number(pm10),
    no2: Number(no2),
    co: Number(co),
    o3: Number(o3),
    so2: Number(so2),
    recommendation
  };
};
