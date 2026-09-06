# 🌦️ SkyCast Frontend (Client)

The frontend for **SkyCast AI-Powered Weather Forecast Platform**, built using React 18, Vite, Tailwind CSS, and Recharts.

---

## 🚀 Features

- **Atmospheric Glassmorphism**: Tailored glowing ambient backgrounds reacting to live weather conditions.
- **Dynamic Routing**: 13 full-screen pages including Dashboard, 24h Hourly & 14-Day Forecasts, Interactive Radar GIS Map, Air Quality Index, Historical Analytics, Severe Alerts, Grounded Gemini AI Weather Assistant, Saved Locations Manager, Contact Us, and Settings.
- **Instant Geocoded Popular Cities**: Quick location buttons for **Kolkata, Delhi, Mumbai, Chennai, Bangalore, Hyderabad, London, New York, Tokyo, and Hong Kong**.
- **Smart Geolocation**: Automatic HTML5 browser detection with graceful fallback to **Kolkata** (`22.57°N, 88.36°E`).
- **Unit Customization**: Switch between °C/°F, km/h/mph, and 12h/24h time formats in real time.

---

## 🛠️ Tech Stack

- **React 18** (Functional components, custom Hooks, Context API)
- **Vite 5** (Ultra-fast build & HMR)
- **Tailwind CSS 3** (Custom glassmorphism utilities & color palette)
- **Lucide React** (Vector icons)
- **Recharts** (Interactive time-series meteorological curves)
- **Leaflet & React-Leaflet** (GIS Weather radar & layers)
- **Axios** (Centralized API client with interceptors)

---

## 📦 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional, defaults to http://localhost:5001)
cp .env.example .env

# 3. Start local development server
npm run dev

# 4. Production build
npm run build
```

---

## 🌐 Deploy to Vercel

1. Import repository to **Vercel**.
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Add environment variable:
   ```env
   VITE_API_URL=https://your-backend-render-url.onrender.com
   ```
5. Click **Deploy**. SPA client routing is pre-configured via `vercel.json`.
