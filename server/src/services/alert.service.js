export const detectSevereAlerts = (weatherData, cityName = 'Current Location') => {
  const alerts = [];
  const { current, hourly = [], aqi } = weatherData;

  // 1. Extreme Heatwave Alert
  if (current?.temperature >= 38) {
    alerts.push({
      id: `alert-heat-${Date.now()}`,
      city: cityName,
      type: 'heatwave',
      severity: current.temperature >= 42 ? 'extreme' : 'severe',
      title: 'Extreme Heatwave Warning',
      description: `Dangerously high temperature of ${current.temperature}°C with feels-like ${current.feelsLike}°C. High dehydration and sunstroke risk.`,
      instruction: 'Stay indoors during peak sunlight hours (11 AM - 4 PM). Drink plenty of fluids and avoid intense exertion.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 8 * 3600 * 1000),
      status: 'active'
    });
  }

  // 2. Heavy Rain / Thunderstorm Alert
  const heavyRainHour = hourly.slice(0, 12).find((h) => h.pop >= 70 || h.rain >= 10);
  if (heavyRainHour || (current?.humidity > 85 && (current?.condition || '').toLowerCase().includes('rain'))) {
    alerts.push({
      id: `alert-rain-${Date.now()}`,
      city: cityName,
      type: 'rain',
      severity: (heavyRainHour?.rain || 0) > 20 ? 'severe' : 'moderate',
      title: 'Heavy Rainfall & Waterlogging Alert',
      description: `High probability of intense precipitation (${heavyRainHour?.pop || 75}%) expected in the coming hours.`,
      instruction: 'Carry an umbrella or rain gear. Avoid low-lying waterlogged roads and drive cautiously.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 6 * 3600 * 1000),
      status: 'active'
    });
  }

  // 3. High Wind / Storm Alert
  if (current?.windSpeed >= 40) {
    alerts.push({
      id: `alert-wind-${Date.now()}`,
      city: cityName,
      type: 'wind',
      severity: current.windSpeed >= 60 ? 'extreme' : 'moderate',
      title: 'Strong Gale Wind Advisory',
      description: `Sustained wind speeds of ${current.windSpeed} km/h detected. Possible falling branches and unstable structures.`,
      instruction: 'Secure loose outdoor objects. Two-wheeler riders should exercise extreme caution on highways.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 4 * 3600 * 1000),
      status: 'active'
    });
  }

  // 4. Hazardous Air Quality Alert
  if (aqi?.aqiValue >= 200) {
    alerts.push({
      id: `alert-aqi-${Date.now()}`,
      city: cityName,
      type: 'aqi',
      severity: aqi.aqiValue >= 300 ? 'extreme' : 'severe',
      title: 'Hazardous Air Quality Warning',
      description: `AQI levels have surged to ${aqi.aqiValue} (${aqi.category}). PM2.5 concentration is significantly above WHO limits.`,
      instruction: 'Wear certified N95 masks when stepping out. Run indoor air purifiers and keep windows closed.',
      startTime: new Date(),
      endTime: new Date(Date.now() + 12 * 3600 * 1000),
      status: 'active'
    });
  }

  return alerts;
};
