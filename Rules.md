# 📜 SkyCast — Engineering Rules & Development Standards

---

## 1. Core Principles

1. **Strict Separation of Concerns**: Controllers handle HTTP logic, Services handle business logic and external integrations, Models represent data structure.
2. **Never Expose Secrets to Client**: All external weather, AQI, and Gemini API keys must strictly live on the Node.js server.
3. **Cache First, Fetch Second**: Every weather or AQI lookup must query the caching layer before dispatching external HTTP calls.
4. **Grounded AI Answers**: The AI assistant must never answer meteorological questions without injecting validated real-time weather context.
5. **Fail-Safe & Graceful Degradation**: If an external weather provider goes down, fallback gracefully to cached records or alternative endpoints without breaking the UI.

---

## 2. Directory Structure Standards

```text
SkyCast/
├── client/                     # Frontend Application (Vite + React)
│   ├── public/                 # Static assets, favicon, manifest
│   ├── src/
│   │   ├── assets/             # Icons, illustrations, weather SVGs
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── common/         # Buttons, Inputs, Modals, Loaders, GlassCard
│   │   │   ├── layout/         # Navbar, Sidebar, Footer, PageWrapper
│   │   │   ├── weather/        # WeatherCard, HourlyForecast, DailyForecast
│   │   │   ├── activity/       # SmartScoreCard, ActivityBreakdown
│   │   │   ├── map/            # WeatherMap, LayerControls, Legend
│   │   │   ├── aqi/            # AQICircle, PollutantBars, HealthCard
│   │   │   ├── charts/         # TempChart, RainBarChart, TrendLine
│   │   │   ├── alerts/         # AlertBanner, AlertCard
│   │   │   └── ai/             # AIChatDrawer, MessageBubble, PromptChips
│   │   ├── context/            # WeatherContext, AuthContext, ThemeContext
│   │   ├── hooks/              # useWeather, useGeolocation, useDebounce, useLocalStorage
│   │   ├── pages/              # Landing, Dashboard, Forecast, Map, AQI, Analytics, Alerts, AI, Locations, Settings, Auth
│   │   ├── services/           # api.js, weatherService.js, aiService.js
│   │   ├── utils/              # formatters.js, unitConverter.js, weatherIcons.js
│   │   ├── App.jsx             # Route definitions and layout provider wrapping
│   │   ├── index.css           # Tailwind base styles and custom glassmorphic classes
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Backend Application (Node.js + Express)
│   ├── src/
│   │   ├── config/             # db.js, env.js, constants.js
│   │   ├── controllers/        # auth, weather, location, aqi, alert, analytics, ai
│   │   ├── middleware/         # auth.js, errorHandler.js, rateLimiter.js, validate.js
│   │   ├── models/             # User.js, Location.js, WeatherCache.js, Alert.js, Conversation.js
│   │   ├── routes/             # auth.routes.js, weather.routes.js, location.routes.js, etc.
│   │   ├── services/           # weather.service.js, gemini.service.js, scoreEngine.js, aqi.service.js
│   │   ├── utils/              # apiResponse.js, logger.js, cacheKey.js
│   │   └── app.js              # Express app configuration & middleware pipeline
│   ├── .env.example
│   ├── package.json
│   └── server.js               # HTTP server listener & DB connection bootstrap
│
├── PRD.md
├── Architecture.md
├── Rules.md
├── Design.md
├── Phases.md
└── Memory.md
```

---

## 3. Backend Development Rules

### 3.1 Standard API Response Wrapper
All endpoints must respond using a unified JSON format:
```javascript
// Success Response
res.status(200).json({
  success: true,
  statusCode: 200,
  message: "Weather data fetched successfully",
  data: { ... },
  cached: true // Indicates whether served from cache
});

// Error Response (Handled by Global Error Middleware)
res.status(400).json({
  success: false,
  statusCode: 400,
  message: "Invalid coordinates provided",
  errors: []
});
```

### 3.2 Asynchronous Controller Wrappers
Use an `asyncHandler` utility to avoid repetitive `try/catch` blocks in controllers:
```javascript
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

### 3.3 Strict Input Validation
All request params, query strings, and request bodies must be sanitized and validated using `express-validator` before reaching service logic.

### 3.4 Caching Mandate
- Generate normalized coordinate keys rounded to 2 decimal places (e.g., `22.57, 88.36` -> `22.57_88.36`).
- Query MongoDB `WeatherCache` before triggering external provider APIs.
- Set cache TTL to 20 minutes (`1200 seconds`).

---

## 4. Frontend Development Rules

### 4.1 Modern React & Clean Components
- Use React 18 functional components with standard hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`).
- Avoid large monolithic page components (> 250 lines). Deconstruct into granular atomic components.

### 4.2 Unit Conversions & Formatting
- Never hardcode raw values with static units in subcomponents.
- Always pass raw data through centralized utility formatters (`formatTemperature(temp, unit)`, `formatWindSpeed(speed, unit)`).

### 4.3 State Management
- **Auth & Preferences**: Managed globally via `AuthContext` and `ThemeContext`.
- **Active Weather & Selected Location**: Managed via `WeatherContext` to ensure synchronization between TopBar search, Dashboard, Maps, and AI Chat.
- **Server Cache & Polling**: Axios interceptors handle 401s and token refresh automatically.

---

## 5. Security & Environment Rules

1. **Environment Variables**:
   - `server/.env` must never be checked into Git.
   - `server/.env.example` must contain placeholder keys for all required variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `WEATHER_API_KEY`, `CLIENT_URL`).
2. **CORS Restrictions**:
   - Explicitly configure allowed origins (`CLIENT_URL`), credentials enabled (`credentials: true`), and standard headers.
3. **Cookie Attributes**:
   - Auth JWT cookies must use `httpOnly: true`, `sameSite: 'lax'`, and `secure: process.env.NODE_ENV === 'production'`.

---

## 6. Git & Commit Guidelines

- **Commit Message Format**: Follow Conventional Commits:
  - `feat: add smart activity score computation engine`
  - `fix: resolve coordinate rounding issue in weather cache`
  - `ui: enhance glassmorphic card contrast in light mode`
  - `docs: update API documentation for /api/v1/ai/chat`
  - `refactor: extract weather data normalizer into separate service`
