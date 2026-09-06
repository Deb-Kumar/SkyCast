# 🚀 SkyCast — Implementation Roadmap & Phases

---

## 1. Development Lifecycle Overview

```text
Phase 1: Foundation & Backend Architecture
   ↓
Phase 2: Weather Ingestion & Caching Layer
   ↓
Phase 3: Activity Scoring Engine & Grounded Gemini AI
   ↓
Phase 4: Frontend Design System & Master Dashboard
   ↓
Phase 5: Forecast, Interactive Maps & Air Quality Modules
   ↓
Phase 6: Visual Analytics, Severe Alerts & Notification Engine
   ↓
Phase 7: End-to-End Verification, Performance Polish & Deployment
```

---

## 2. Detailed Phase Breakdown

### 🟢 Phase 1: Foundation & Backend Architecture
- **Objective**: Establish development environment, folder structure, database connection, and security boilerplate.
- **Key Tasks**:
  - Initialize `server/` with Node.js, Express, MongoDB Mongoose, and dotenv.
  - Setup unified API response format, global error handler, and async wrappers.
  - Implement User and Location Mongoose models.
  - Implement JWT authentication with password hashing (bcrypt), registration, login, logout, and `/api/v1/auth/me`.
  - Configure Helmet, strict CORS policy, and `express-rate-limit`.

---

### 🟢 Phase 2: Weather Ingestion & Intelligent Caching Layer
- **Objective**: Build robust weather ingestion pipelines with TTL auto-expiring cache.
- **Key Tasks**:
  - Setup `WeatherCache` model with coordinate rounding and MongoDB TTL index (`expires: 0`).
  - Implement `WeatherService` to query Open-Meteo / WeatherAPI / OpenWeather.
  - Implement data normalization pipeline for Current, 24h Hourly, and 7-day Daily records.
  - Build Geocoding & Search API endpoint (`/api/v1/locations/search`).
  - Implement Location CRUD endpoints for user favorites and default locations.

---

### 🟢 Phase 3: Activity Scoring Engine & Grounded Gemini AI
- **Objective**: Develop the proprietary Smart Activity Score algorithm and context-grounded AI assistant.
- **Key Tasks**:
  - Build `ActivityScoreEngine` calculating general outdoor, football, walking, riding, and photography scores (0–100).
  - Implement `GeminiAIService` using Google Gen AI SDK.
  - Design system prompts that strictly inject normalized real-time weather and 24h forecast data before passing user queries.
  - Build `/api/v1/ai/chat` and conversation persistence endpoint.

---

### 🟢 Phase 4: Frontend Design System & Master Dashboard
- **Objective**: Setup Vite + React frontend, glassmorphism design tokens, and the primary dashboard.
- **Key Tasks**:
  - Initialize `client/` with Vite, React 18, Tailwind CSS, Lucide React icons, and Framer Motion.
  - Setup `AuthContext`, `WeatherContext`, and `ThemeContext`.
  - Build Layout Shell: TopBar with autocomplete search, Geolocation trigger, and Sidebar navigation.
  - Implement Landing Page (`/`) with live preview hero and feature showcase.
  - Build Main Dashboard (`/dashboard`) with Hero Weather Card, Smart Activity Score, Precipitation Timeline, and 24h hourly strip.

---

### 🟢 Phase 5: Forecast, Interactive Maps & Air Quality Modules
- **Objective**: Complete in-depth forecast exploration, interactive multi-layer map, and AQI monitoring.
- **Key Tasks**:
  - Build Detailed Forecast Page (`/forecast`) with 24h timeline and expandable daily metric cards.
  - Integrate Leaflet / Mapbox for Interactive Weather Map (`/map`) with toggleable Precipitation Radar, Temperature, Wind, and Cloud layers.
  - Build Air Quality Page (`/air-quality`) with radial AQI gauge, pollutant breakdown (PM2.5, PM10, etc.), and health advisory advice.

---

### 🟢 Phase 6: Visual Analytics, Severe Alerts & Notification Engine
- **Objective**: Implement historical data visualization, automated severe alert engine, and web notifications.
- **Key Tasks**:
  - Build Analytics Page (`/analytics`) using Recharts (Temperature trend, Precipitation volume, Humidity vs Dew Point).
  - Implement Severe Weather Alert evaluation engine and Alerts Page (`/alerts`).
  - Integrate Web Notification API in the browser to trigger alerts for upcoming rain and extreme conditions.
  - Build User Settings Page (`/settings`) for unit switching (°C/°F, km/h/mph), theme, and notification toggles.

---

### 🟢 Phase 7: Polish, Performance Audits & Deployment
- **Objective**: End-to-end testing, responsive audits, Lighthouse optimization, and production deployment.
- **Key Tasks**:
  - Perform cross-device testing (Desktop, Laptop, Tablet, Mobile browsers).
  - Audit Google Lighthouse scores (target > 90 on Performance, A11y, Best Practices, SEO).
  - Configure production build scripts and environment variables.
  - Prepare deployment configurations (Vercel for Frontend, Render/Railway for Backend, MongoDB Atlas for Database).
