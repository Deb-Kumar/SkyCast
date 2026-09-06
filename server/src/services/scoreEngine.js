/**
 * Proprietary Smart Activity Score Engine
 * Computes suitability scores (0 - 100) for various activities
 * based on Temperature, Rain Probability, Wind, UV, Humidity, AQI, and Condition.
 */

export const calculateActivityScores = ({
  temperature = 25,
  pop = 0, // precipitation probability %
  windSpeed = 10, // km/h
  humidity = 50,
  uvIndex = 3,
  aqi = 50,
  condition = 'Clear'
}) => {
  // 1. General Outdoor Score
  let tempPenalty = 0;
  if (temperature < 15) {
    tempPenalty = Math.min(30, (15 - temperature) * 2.5);
  } else if (temperature > 28) {
    tempPenalty = Math.min(35, (temperature - 28) * 3.2);
  }

  const rainPenalty = Math.min(45, (pop / 100) * 50);
  const windPenalty = windSpeed > 20 ? Math.min(25, (windSpeed - 20) * 1.5) : 0;
  const uvPenalty = uvIndex > 7 ? Math.min(20, (uvIndex - 7) * 4) : 0;
  const aqiPenalty = aqi > 100 ? Math.min(35, ((aqi - 100) / 100) * 25) : 0;

  const baseOutdoor = Math.round(Math.max(10, Math.min(100, 100 - (tempPenalty + rainPenalty + windPenalty + uvPenalty + aqiPenalty))));

  // 2. ⚽ Football / Soccer Score (high physical activity, sensitive to rain, heat, and slick ground)
  let fbTempPenalty = 0;
  if (temperature < 12) fbTempPenalty = (12 - temperature) * 2.8;
  else if (temperature > 30) fbTempPenalty = (temperature - 30) * 4.5;
  const fbRainPenalty = (pop / 100) * 60;
  const footballScore = Math.round(Math.max(5, Math.min(100, 100 - (fbTempPenalty + fbRainPenalty + windPenalty * 1.2 + aqiPenalty * 1.4))));

  // 3. 🚶 Walking / Jogging Score (moderate tolerance, sensitive to rain and extreme AQI)
  const walkRainPenalty = (pop / 100) * 45;
  const walkingScore = Math.round(Math.max(10, Math.min(100, 100 - (tempPenalty * 0.9 + walkRainPenalty + aqiPenalty * 1.5 + uvPenalty))));

  // 4. 🏍️ Riding / Cycling Score (highly sensitive to wind gusts and wet roads)
  const rideWindPenalty = windSpeed > 15 ? (windSpeed - 15) * 2.2 : 0;
  const rideRainPenalty = (pop / 100) * 55;
  const ridingScore = Math.round(Math.max(5, Math.min(100, 100 - (rideWindPenalty + rideRainPenalty + tempPenalty * 0.8 + aqiPenalty))));

  // 5. 📸 Photography Score (favors golden hour, clear skies or dramatic clouds, low rain, pleasant temps)
  const isOvercast = condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast');
  const photoBonus = isOvercast ? 5 : 0;
  const photoRainPenalty = (pop / 100) * 65;
  const photographyScore = Math.round(Math.max(15, Math.min(100, 100 - (photoRainPenalty + windPenalty * 0.8 + (aqi > 150 ? 30 : 0)) + photoBonus)));

  return {
    overall: baseOutdoor,
    football: footballScore,
    walking: walkingScore,
    riding: ridingScore,
    outdoor: baseOutdoor,
    photography: photographyScore
  };
};
