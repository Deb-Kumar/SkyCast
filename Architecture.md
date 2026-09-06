# 🏛️ SkyCast — System Architecture & Technical Design

---

## 1. High-Level Architecture Overview

SkyCast follows a decoupled client-server architecture built on the MERN / Node.js stack with an intelligent caching layer and an AI proxy gateway.

```text
  ┌──────────────────────────────────────────────────────────────────┐
  │                        REACT FRONTEND                            │
  │   Vite + React 18 + Tailwind CSS + Framer Motion + Recharts      │
  │   (Context API, TanStack Query, Leaflet / Mapbox GL)             │
  └───────────────────────────────┬──────────────────────────────────┘
                                  │ HTTPS (JSON / REST API)
                                  ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │                    NODE.JS / EXPRESS BACKEND                     │
  │  ┌────────────────────────────────────────────────────────────┐  │
  │  │ Security Middleware (Helmet, CORS, RateLimiter, CookieJWT)  │  │
  │  └────────────────────────────┬───────────────────────────────┘  │
  │                               ▼                                  │
  │  ┌────────────────────────────────────────────────────────────┐  │
  │  │                      API CONTROLLERS                       │  │
  │  │   Auth | Weather | Location | AQI | Alerts | Analytics | AI │  │
  │  └────────────────────────────┬───────────────────────────────┘  │
  │                               ▼                                  │
  │  ┌────────────────────────────────────────────────────────────┐  │
  │  │                       SERVICE LAYER                        │  │
  │  │  - WeatherService (Data Normalizer & Cache Check)          │  │
  │  │  - ActivityScoreEngine (Multi-Factor Scoring Formula)      │  │
  │  │  - GeminiAIService (Context Builder & RAG Ingestion)       │  │
  │  │  - AlertEngine (Threshold-based Weather Anomaly Evaluator) │  │
  │  └──────────────┬─────────────────────────────┬───────────────┘  │
  └─────────────────┼─────────────────────────────┼──────────────────┘
                    │                             │
        External API Calls (HTTPS)        Database Read/Write (Mongoose)
                    ▼                             ▼
  ┌─────────────────────────────────┐   ┌─────────────────────────────┐
  │      EXTERNAL PROVIDERS         │   │       MONGODB ATLAS         │
  │  • Weather Provider (Open-Meteo │   │  • Users & Preferences      │
  │    / OpenWeather / WeatherAPI)  │   │  • Saved Locations          │
  │  • Air Quality API              │   │  • WeatherCache (TTL Index) │
  │  • Map Tile Server (OpenStreet) │   │  • Alerts & History         │
  │  • Google Gemini 1.5/2.0 API    │   │  • AI Conversations         │
  └─────────────────────────────────┘   └─────────────────────────────┘
```

---

## 2. AI Weather Assistant Data Flow (Grounded RAG Flow)

To prevent LLM hallucination, the Gemini API is never asked open-ended weather questions without immediate data injection.

```text
   [User asks: "Can I play football in Kolkata at 5 PM?"]
                           │
                           ▼
               [Node.js Backend /api/v1/ai/chat]
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    [Fetch Current Weather]    [Fetch 24h Hourly Forecast]
    (Cache-first via DB)       (Cache-first via DB)
             │                           │
             └─────────────┬─────────────┘
                           ▼
          [Calculate Smart Activity Score (Football)]
                           │
                           ▼
         [Construct Structured Prompt with System Context]
         "System: You are SkyCast AI. Base your answers strictly
          on the meteorological metrics provided below:
          - Location: Kolkata (22.57, 88.36)
          - Current: 31°C, Humidity: 78%, Rain: 10%
          - 5:00 PM Forecast: 28°C, Rain Prob: 75%, Thunderstorm: High
          - Outdoor Football Score: 38/100 (Unfavorable)
          Question: Can I play football in Kolkata at 5 PM?"
                           │
                           ▼
                  [Google Gemini API]
                           │
                           ▼
    [Response: "🌧️ It is not recommended to play football at 5 PM
     in Kolkata. Heavy thunderstorm and a 75% chance of rain are
     expected. Your Football Activity Score drops to 38/100."]
```

---

## 3. Database Schema Design (MongoDB / Mongoose)

### 3.1 `User` Model
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: "" },
  preferences: {
    temperatureUnit: { type: String, enum: ['C', 'F'], default: 'C' },
    windSpeedUnit: { type: String, enum: ['kmh', 'mph', 'ms'], default: 'kmh' },
    timeFormat: { type: String, enum: ['12h', '24h'], default: '12h' },
    theme: { type: String, enum: ['dark', 'light', 'system'], default: 'dark' },
    notifications: {
      rain: { type: Boolean, default: true },
      severeWeather: { type: Boolean, default: true },
      aqi: { type: Boolean, default: false }
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 3.2 `Location` Model (Saved Places)
```javascript
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true }, // e.g. "Home", "Campus"
  tag: { type: String, enum: ['home', 'work', 'college', 'favorite', 'custom'], default: 'custom' },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isDefault: { type: Boolean, default: false },
  createdAt: Date
}
```

### 3.3 `WeatherCache` Model (Auto-Expiring Cache via MongoDB TTL)
```javascript
{
  _id: ObjectId,
  coordKey: { type: String, required: true, unique: true, index: true }, // e.g. "22.57_88.36"
  cityName: String,
  country: String,
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
    sunset: String
  },
  hourly: [{
    time: Date,
    temp: Number,
    feelsLike: Number,
    pop: Number, // Probability of Precipitation (%)
    rain: Number, // mm
    condition: String,
    icon: String,
    windSpeed: Number,
    uvIndex: Number
  }],
  daily: [{
    date: Date,
    tempMax: Number,
    tempMin: Number,
    pop: Number,
    condition: String,
    icon: String,
    sunrise: String,
    sunset: String,
    uvIndex: Number
  }],
  aqi: {
    aqiValue: Number,
    category: String,
    pm25: Number,
    pm10: Number,
    no2: Number,
    co: Number,
    o3: Number,
    so2: Number
  },
  activityScores: {
    overall: Number,
    football: Number,
    walking: Number,
    riding: Number,
    outdoor: Number,
    photography: Number
  },
  fetchedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expires: 0 } } // TTL auto-delete
}
```

### 3.4 `Alert` Model
```javascript
{
  _id: ObjectId,
  latitude: Number,
  longitude: Number,
  city: String,
  type: { type: String, enum: ['rain', 'storm', 'heatwave', 'coldwave', 'wind', 'aqi'] },
  severity: { type: String, enum: ['low', 'moderate', 'severe', 'extreme'] },
  title: String,
  description: String,
  instruction: String,
  startTime: Date,
  endTime: Date,
  status: { type: String, enum: ['active', 'resolved'], default: 'active' },
  createdAt: Date
}
```

### 3.5 `Conversation` Model (AI History)
```javascript
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true, index: true },
  location: {
    city: String,
    latitude: Number,
    longitude: Number
  },
  messages: [{
    role: { type: String, enum: ['user', 'model', 'system'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 4. REST API Endpoints Specification

Base Path: `/api/v1`

### 4.1 Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register new user account | No |
| `POST` | `/auth/login` | Authenticate & issue JWT cookie | No |
| `POST` | `/auth/logout` | Clear auth cookie | Yes |
| `GET` | `/auth/me` | Fetch authenticated user profile & prefs | Yes |
| `PUT` | `/auth/preferences` | Update user units, theme & notifications | Yes |

### 4.2 Weather & Forecast (`/weather`)
| Method | Endpoint | Query Params | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/weather/current` | `lat, lon` or `q=cityName` | Real-time weather + activity scores |
| `GET` | `/weather/hourly` | `lat, lon` | 24-hour detailed hourly timeline |
| `GET` | `/weather/daily` | `lat, lon, days=7` | 7-14 day forecast cards |
| `GET` | `/weather/precipitation`| `lat, lon` | 3h minute-interval timeline |

### 4.3 Locations (`/locations`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/locations/search` | Geocoding search by query (`?q=Kolkata`) | No |
| `GET` | `/locations` | Retrieve user saved locations | Yes |
| `POST` | `/locations` | Add location to favorites | Yes |
| `PUT` | `/locations/:id` | Update location tag / default status | Yes |
| `DELETE`| `/locations/:id` | Remove saved location | Yes |

### 4.4 Air Quality & Environment (`/air-quality`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/air-quality/current` | AQI index, breakdown (PM2.5, PM10, etc.) + health advice |
| `GET` | `/air-quality/forecast`| 24-hour AQI trend |

### 4.5 Severe Weather Alerts (`/alerts`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/alerts/active` | Active severe alerts for coordinates (`?lat=...&lon=...`) |
| `GET` | `/alerts/history` | Historical alerts by location |

### 4.6 Weather Analytics (`/analytics`)
| Method | Endpoint | Query Params | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/analytics/trends` | `lat, lon, range=24h/7d/30d` | Temperature, rain, humidity data series |
| `GET` | `/analytics/compare` | `lat, lon` | Today vs Yesterday & seasonal comparisons |

### 4.7 Gemini AI Assistant (`/ai`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/ai/chat` | Send message with location context & receive grounded response | Optional (Guest/User) |
| `GET` | `/ai/conversations` | Retrieve user's chat history | Yes |
| `DELETE`| `/ai/conversations/:id`| Clear conversation | Yes |

---

## 5. Smart Activity Score Algorithm

The outdoor score is computed via a weighted multi-factor penalty algorithm:

$$\text{Score} = 100 - (P_{\text{temp}} + P_{\text{rain}} + P_{\text{wind}} + P_{\text{uv}} + P_{\text{aqi}})$$

Where penalties are evaluated as:
1. **Temperature Penalty ($P_{\text{temp}}$)**: Optimal range 18°C–26°C. Penalties scale quadratically outside this window.
2. **Rain Penalty ($P_{\text{rain}}$)**: Scaled based on Precipitation Probability ($\text{PoP} \times 0.6$).
3. **Wind Penalty ($P_{\text{wind}}$)**: Optimal $< 15\text{ km/h}$. Penalties increase rapidly over $30\text{ km/h}$.
4. **UV Penalty ($P_{\text{uv}}$)**: UV Index $> 7$ applies up to 20 points penalty.
5. **AQI Penalty ($P_{\text{aqi}}$)**: AQI $> 100$ applies severe penalties.

Activity-specific weights adjust these parameters (e.g., Football heavily weights rain and temperature; Photography weights cloud cover and golden hour timing).

---

## 6. Security Architecture

1. **Token Security**: JWT stored in `HttpOnly`, `Secure` (in production), `SameSite=Lax` cookies to mitigate XSS and CSRF.
2. **Rate Limiting**: `express-rate-limit` prevents brute-force login and DOS attacks on weather/AI routes.
3. **Sanitization**: Input sanitization via `express-validator` and NoSQL injection mitigation.
4. **API Key Encapsulation**: Weather provider and Google Gemini API keys are restricted entirely to server-side environment variables (`.env`).
