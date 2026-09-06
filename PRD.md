# 🌦️ SkyCast — Product Requirements Document (PRD)

---

## 1. Executive Summary

**SkyCast** is an enterprise-grade, AI-powered weather forecast and climate intelligence web platform. Moving beyond traditional temperature lookups, SkyCast integrates hyper-local real-time meteorological data, multi-model forecasts, interactive multi-layer weather maps, air quality intelligence, severe weather alert engines, historical analytics, a proprietary **Smart Activity Score**, and a context-grounded **Gemini AI Weather Assistant**.

---

## 2. Problem Statement & Value Proposition

### 2.1 The Problem
- **Fragmented Data**: Users check one app for temperature, another for AQI, and another for travel/sports planning.
- **Raw Data Overload**: Standard apps present numbers without actionable insights (e.g., "Humidity 85%, UV 8" does not clearly tell a user if they can safely jog or play football).
- **Hallucinating AI Bots**: Generic AI assistants guess weather without grounding in real-time sensor streams.
- **Excessive API Inefficiencies**: Inefficient weather web apps spam third-party APIs without intelligent caching layers, leading to rate-limiting and high operational costs.

### 2.2 The Solution: SkyCast
- **Unified Meteorological Dashboard**: Real-time conditions, 24h hourly & 7/14-day forecasts, radar maps, and AQI in a single glassmorphic interface.
- **Proprietary Smart Activity Score**: Algorithmic scoring (0–100) for outdoor activities (Football, Running, Riding, Photography, Travel).
- **Grounded Gemini AI Assistant**: Natural language weather consultation powered by Gemini API, strictly injected with verified real-time weather and forecast data.
- **Intelligent Dual-Layer Caching**: MongoDB TTL and in-memory cache to guarantee sub-100ms response times and minimize external API calls.

---

## 3. Target Audience & User Personas

1. **Everyday Commuters & Students**: Need immediate rain alerts, clothing recommendations, and commute weather windows.
2. **Outdoor Enthusiasts & Athletes**: Rely on humidity, wind speed, UV index, and the proprietary Smart Activity Score.
3. **Asthma & Allergy Patients / Health Conscious**: Need real-time PM2.5, PM10, AQI levels, and health advice.
4. **Travelers & Event Planners**: Compare multi-city forecasts, historical trends, and precipitation timelines.

---

## 4. Detailed Feature Specifications

### 4.1 Module A: Core Meteorological Engine
- **Current Conditions**: Temperature, "Feels-Like" (heat index/wind chill), condition text & animated icon, humidity, atmospheric pressure (hPa), wind speed (km/h or mph) & direction (cardinal + degrees), visibility (km/mi), cloud coverage (%), UV index (0–11+), dew point, sunrise, sunset.
- **Hourly Forecast (24 Hours)**: Hour-by-hour temperature, precipitation probability, wind velocity, and condition trends.
- **Daily Forecast (7 to 14 Days)**: Day/night high-low curves, precipitation totals (mm/in), humidity, wind forecasts, and sunrise/sunset timings.
- **Precipitation Timeline**: Minute-cast / 3-hour precipitation probability timeline with start/stop projections.

### 4.2 Module B: Location & Geolocation Management
- **Automatic Browser Geolocation**: Prompts for HTML5 Geolocation to automatically load local weather.
- **Global Search & Geocoding**: Search by city name, state, country, postal code, or `latitude,longitude`.
- **Saved / Favorite Locations**: Support custom tags (🏠 Home, 🎓 College, 💼 Work, ⭐ Favorite). One-click switching and default location setting.

### 4.3 Module C: Grounded Gemini AI Weather Assistant
- **Context Injection Architecture**:
  ```text
  User Question + Current Location/Data + 24h Forecast
        ↓
  Node.js Backend Context Builder
        ↓
  Google Gemini API
        ↓
  Actionable, Grounded Answer
  ```
- **Supported Capabilities**:
  - Umbrella & clothing advice ("Should I take a jacket today?")
  - Activity feasibility ("Can I play cricket at 4 PM in Kolkata?")
  - Travel comparison ("Compare the weather in Delhi vs Mumbai this weekend.")
  - Conversational history saved per user session.

### 4.4 Module D: Proprietary Smart Activity Score
- **Calculated Metric (0–100)**: Evaluates temperature sweet spots, precipitation risk, wind tolerance, UV safety, and air quality.
- **Activity Sub-Scores**:
  - ⚽ Football / Soccer
  - 🚶 Walking & Running
  - 🏍️ Riding / Commuting
  - 🏖️ Beach & Outdoors
  - 📸 Photography & Golden Hour

### 4.5 Module E: Interactive Weather Radar Map
- **Interactive Multi-Layer Map**: Built with Leaflet / Mapbox.
- **Toggleable Overlays**:
  - 🌧️ Precipitation Radar
  - 🌡️ Temperature Heatmap
  - 💨 Wind Velocity & Streamlines
  - ☁️ Cloud Cover
  - 🌫️ Air Quality (AQI)

### 4.6 Module F: Air Quality Index (AQI) & Pollutant Monitoring
- **Real-Time AQI Calculation**: US-EPA / European Air Quality standards.
- **Pollutant Breakdown**: PM2.5, PM10, NO₂, CO, O₃, SO₂.
- **Health Advisories**: Specific recommendations for children, elderly, and sensitive groups.

### 4.7 Module G: Severe Weather Alert Engine
- **Early Warnings**: Thunderstorms, Cyclones, Heatwaves, Cold waves, High Winds, Heavy Rainfall, Hazardous AQI.
- **Alert Cards**: Severity levels (Low, Moderate, Severe, Extreme), effective time window, instructions, and safety guidance.

### 4.8 Module H: Weather Analytics & Historical Comparison
- **Visual Analytics**: Interactive Recharts graphs for temperature variations, precipitation accumulation, humidity trends, and wind variations.
- **Historical Comparison**:
  - Today vs. Yesterday
  - Current week vs. Previous week
  - Seasonal averages vs. Current temperature

### 4.9 Module I: User Accounts & Personalization
- **Authentication**: JWT authentication with secure HTTP-only cookies and bcrypt password hashing.
- **Preferences**:
  - Temperature Unit: Celsius (°C) / Fahrenheit (°F)
  - Wind Speed Unit: km/h / mph / m/s
  - Time Format: 12-hour / 24-hour
  - Theme: Dark Mode / Light Mode / System
  - Notification Permissions: Rain, Storm, Severe AQI

---

## 5. Non-Functional Requirements (NFRs)

| Category | Requirement | Target Metric |
| :--- | :--- | :--- |
| **Performance** | API Response time for cached weather data | < 100ms |
| **Performance** | Initial Page Load (LCP) | < 1.5s |
| **Availability** | System Uptime | 99.9% |
| **Security** | Auth Tokens & Secrets | HTTP-only Cookies, strict CORS, Helmet headers |
| **Caching** | Weather Data Cache TTL | 15–30 minutes per coordinate grid |
| **Scalability** | Architecture | Stateless Node.js API with MongoDB Atlas cluster |
| **Responsiveness** | Device Compatibility | Seamless UI across Desktop, Laptop, Tablet, Mobile |

---

## 6. Success Metrics & Key Performance Indicators (KPIs)

1. **User Retention**: Daily active users checking weather and saved locations.
2. **AI Accuracy & Reliability**: 0% hallucination rate due to strict data grounding.
3. **API Cost Efficiency**: > 80% cache hit ratio on weather lookups.
4. **Performance Score**: Google Lighthouse score > 90 across Performance, Accessibility, and SEO.
