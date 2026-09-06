import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;

const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

/**
 * Grounded Gemini AI Prompt Builder
 * Injects verified meteorological data into the system context
 */
export const queryWeatherAI = async ({
  prompt,
  locationName = 'Current Location',
  weatherData = {},
  history = []
}) => {
  const current = weatherData.current || {};
  const hourly = weatherData.hourly || [];
  const daily = weatherData.daily || [];
  const aqi = weatherData.aqi || {};
  const scores = weatherData.activityScores || {};

  // Construct structured data grounding summary
  const groundingContext = `
METEOROLOGICAL GROUNDING CONTEXT (VERIFIED LIVE DATA FOR ${locationName.toUpperCase()}):
- Coordinates: ${weatherData.latitude || 'N/A'}, ${weatherData.longitude || 'N/A'}
- Current Temperature: ${current.temperature}°C (Feels like ${current.feelsLike}°C)
- Current Condition: ${current.condition}
- Humidity: ${current.humidity}% | Wind Speed: ${current.windSpeed} km/h (Direction: ${current.windDirection}°)
- UV Index: ${current.uvIndex} (Max: ${daily[0]?.uvIndex || current.uvIndex}) | Dew Point: ${current.dewPoint}°C | Pressure: ${current.pressure} hPa
- Air Quality Index (AQI): ${aqi.aqiValue} (${aqi.category})
- Rain Probability (Immediate): ${hourly[0]?.pop || 0}% | Next 3-6 Hours: ${hourly.slice(0, 6).map((h) => `${h.time.slice(11, 16)}: ${h.pop}% (${h.condition})`).join(', ')}
- 7-Day Outlook: ${daily.slice(0, 5).map((d) => `${d.date}: High ${d.tempMax}°C / Low ${d.tempMin}°C, Rain ${d.pop}%, ${d.condition}`).join(' | ')}
- Smart Activity Scores: Overall Outdoor: ${scores.overall}/100, Football: ${scores.football}/100, Walking: ${scores.walking}/100, Riding: ${scores.riding}/100, Photography: ${scores.photography}/100.
`;

  const systemInstruction = `You are "SkyCast AI", an expert meteorological consultant and intelligent weather assistant for ${locationName}.
Strict Rules:
1. ALWAYS ground your weather advice strictly in the real-time meteorological metrics provided above. Never hallucinate or invent conflicting weather data.
2. If the user sends a simple greeting (e.g., "hi", "hii", "hello", "hey", "good morning"), reply warmly, concisely, and naturally. Mention the current temperature/condition briefly and invite their weather questions without dumping raw statistics.
3. Be conversational, empathetic, concise, and highly actionable.
4. Use clean markdown formatting with appropriate emojis (🌧️, ☀️, ⚽, 🧣, 💨, ⚠️).
5. When asked about activities (e.g., sports, travel, clothing, umbrella, photography), reference the specific Smart Activity Scores, precipitation timeline, and AQI from the context.`;

  // If Gemini API Key is present, call Gemini Model
  const aiClient = getGenAI();
  if (aiClient) {
    const candidateModels = ['gemini-1.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-2.5-flash'];
    for (const modelName of candidateModels) {
      try {
        const model = aiClient.getGenerativeModel({ model: modelName });
        const fullPrompt = `${systemInstruction}\n\n${groundingContext}\n\nUser Question: ${prompt}`;
        
        // Timeout after 6 seconds to ensure fast UI response
        const apiCall = model.generateContent(fullPrompt);
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Gemini API timeout')), 6000));
        
        const result = await Promise.race([apiCall, timeoutPromise]);
        const response = await result.response;
        const text = response.text();
        if (text && text.trim()) return text;
      } catch (error) {
        // Try next candidate model
        continue;
      }
    }
  }

  // Intelligent Grounded Deterministic Fallback Engine (when API key is not yet configured or offline)
  const q = prompt.toLowerCase().trim();

  // Natural greeting handling
  const isGreeting = /^(hi+|hello+|hey+|howdy|yo|sup|good\s*(morning|afternoon|evening|day)|greetings)(\s+there|\s+bot|\s+skycast|\s+ai)?[!.]*$/i.test(q) || q.includes('how are you');
  if (isGreeting) {
    return `👋 **Hello!** I'm SkyCast AI, your meteorological consultant for **${locationName}**.\n\nIt's currently **${current.temperature || 28}°C** with **${current.condition || 'Clear skies'}** (Feels like **${current.feelsLike || current.temperature || 28}°C**).\n\nHow can I assist you today? You can ask:\n- ☔ *"Should I carry an umbrella today?"*\n- ⚽ *"Can I play football or go running at 5 PM?"*\n- 👕 *"What should I wear right now?"*\n- 🧳 *"Is tomorrow good for travelling?"*`;
  }

  if (q.includes('rain') || q.includes('umbrella')) {
    const rainChance = hourly.slice(0, 8).reduce((max, h) => Math.max(max, h.pop || 0), 0);
    if (rainChance > 50) {
      return `🌧️ **High chance of rain (${rainChance}%) in ${locationName}.**\n\n- **Recommendation**: Definitely carry an umbrella or rain jacket today.\n- **Peak Rain Window**: Expect precipitation between ${hourly[2]?.time?.slice(11, 16) || 'afternoon'} and ${hourly[5]?.time?.slice(11, 16) || 'evening'}.\n- **Precipitation Probability**: Starts around ${hourly[0]?.pop || 10}% now and rises to ${rainChance}%.`;
    } else {
      return `☀️ **Rain is unlikely today in ${locationName}.**\n\n- **Precipitation Chance**: Maximum rain probability is only **${rainChance}%** over the next 12 hours.\n- **Verdict**: No umbrella needed! Current conditions are **${current.condition}** with a pleasant temperature of **${current.temperature}°C**.`;
    }
  }

  if (q.includes('football') || q.includes('cricket') || q.includes('sport') || q.includes('play')) {
    const fbScore = scores.football || 75;
    const verdict = fbScore >= 70 ? '🟢 Excellent condition for sports' : fbScore >= 45 ? '🟡 Moderate conditions' : '🔴 Unfavorable conditions';
    return `⚽ **Sports & Outdoor Activity Analysis for ${locationName}:**\n\n- **Football / Sports Score**: **${fbScore}/100** (${verdict})\n- **Temperature**: ${current.temperature}°C (Feels like ${current.feelsLike}°C)\n- **Rain Risk**: ${hourly[0]?.pop || 0}% precipitation chance\n- **Wind**: ${current.windSpeed} km/h\n- **Advice**: ${fbScore >= 60 ? 'Conditions are great! Stay hydrated and enjoy your game.' : 'Expect slick ground or uncomfortable heat/rain. Consider playing indoors or timing around the clearer windows.'}`;
  }

  if (q.includes('wear') || q.includes('clothes') || q.includes('jacket')) {
    let advice = '';
    if (current.temperature < 15) {
      advice = '🧥 **Cool weather detected**: Wear warm layers, a light jacket or sweater.';
    } else if (current.temperature > 30) {
      advice = '👕 **Warm/Hot conditions**: Wear lightweight, breathable cotton fabrics, sunglasses, and apply sunscreen.';
    } else {
      advice = '👕 **Pleasant temperature**: Comfortable casual attire like a t-shirt or light shirt is ideal.';
    }
    return `${advice}\n\n- **Current Temperature**: ${current.temperature}°C (Feels like ${current.feelsLike}°C)\n- **UV Index**: ${current.uvIndex} ${current.uvIndex >= 6 ? '(High — UV protection recommended)' : '(Moderate)'}\n- **Wind**: ${current.windSpeed} km/h`;
  }

  if (q.includes('travel') || q.includes('trip') || q.includes('weekend')) {
    return `🧳 **Travel & Outlook for ${locationName}:**\n\n- **Current Situation**: ${current.condition}, ${current.temperature}°C\n- **Upcoming Trend**: Highs around ${daily[0]?.tempMax || 30}°C, Lows near ${daily[0]?.tempMin || 22}°C\n- **AQI**: ${aqi.aqiValue} (${aqi.category})\n- **Travel Recommendation**: Overall outdoor score is **${scores.overall || 80}/100**. ${aqi.aqiValue > 150 ? 'Be mindful of air quality.' : 'Great weather for commuting and travel.'}`;
  }

  // General grounded response
  return `🌤️ **SkyCast Weather Insight for ${locationName}:**\n\nCurrently, it is **${current.temperature}°C** with **${current.condition}** (Feels like **${current.feelsLike}°C**).\n\n- **Humidity**: ${current.humidity}%\n- **Wind Speed**: ${current.windSpeed} km/h\n- **Air Quality**: ${aqi.aqiValue} (${aqi.category})\n- **Outdoor Activity Score**: **${scores.overall || 85}/100**\n\nFeel free to ask me specific questions like *"Should I carry an umbrella?"*, *"Can I play football at 5 PM?"*, or *"What should I wear today?"*!`;
};
