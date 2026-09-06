# 🌦️ SkyCast — AI-Powered Weather Forecast & Climate Intelligence Platform

<div align="center">

![SkyCast Banner](https://img.shields.io/badge/SkyCast-Meteorological%20Intelligence-38bdf8?style=for-the-badge&logo=sky&logoColor=white)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<p align="center">
  A state-of-the-art, full-stack atmospheric intelligence and climate decision platform combining hyper-local real-time weather telemetry, multi-model forecasts, interactive radar maps, comprehensive air quality analytics, severe weather alerts, a proprietary <strong>Smart Outdoor Activity Score</strong>, and a context-grounded <strong>Gemini AI Weather Assistant</strong>.
</p>

[Live Demo](http://localhost:5173) • [API Documentation](#-rest-api-reference) • [Architecture](#-system-architecture) • [Deployment](#-deployment-guide)

</div>

---

## 📑 Table of Contents

- [🌟 Key Highlights & Proprietary Features](#-key-highlights--proprietary-features)
- [🏛️ System Architecture](#️-system-architecture)
- [📦 Project Structure](#-project-structure)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [⚙️ Environment Configuration](#️-environment-configuration)
- [📡 REST API Reference](#-rest-api-reference)
- [🤖 Grounded Gemini AI Integration](#-grounded-gemini-ai-integration)
- [📬 Dual-Channel Support & Contact Mailer](#-dual-channel-support--contact-mailer)
- [🌐 Deployment Guide](#-deployment-guide)
- [📜 License](#-license)

---

## 🌟 Key Highlights & Proprietary Features

- 🤖 **Grounded Gemini AI Assistant**: Natural language weather consulting injected with verified live telemetry to eliminate hallucinations and provide contextual clothing, travel, and activity advice.
- 🎯 **Proprietary Smart Activity Score**: Multi-factor outdoor suitability engine (0–100) evaluating temperature, rain risk, wind velocity, UV index, and air pollutants for **Football**, **Walking/Running**, **Riding**, and **Photography**.
- 🌧️ **Precipitation Timeline**: 3-hour precipitation probability bar chart with start/stop rainfall projections.
- 🗺️ **Interactive Radar Map**: Leaflet-powered GIS weather map with toggleable **Precipitation Radar**, **Temperature Heatmap**, **Wind Streamlines**, and **Cloud Cover**.
- 🌫️ **Comprehensive Air Quality (AQI)**: US-EPA standard AQI gauge tracking **PM2.5, PM10, NO₂, CO, O₃, SO₂** with targeted medical health advisories.
- 🚨 **Severe Weather Alerts Engine**: Automated detection and early warnings for thunderstorms, heatwaves, cyclones, and hazardous AQI.
- 📍 **Smart Geolocation & Favorite Locations**: Automatic browser GPS detection with fallback to **Kolkata** (`22.57°N, 88.36°E`) and saved locations manager with custom category tags (*Home, Work, College, Favorite*).
- 📬 **Dual-Channel SMTP Mail Service**: Contact Us form powered by Nodemailer delivering user inquiries to `debkumarpayra32@gmail.com`, tracking logs to `devkumar.workspace@gmail.com`, and automated confirmation receipts to users.
- ⚡ **High-Performance Caching**: MongoDB TTL auto-expiration caching and normalized coordinate keys (`lat.toFixed(2)_lon.toFixed(2)`) for sub-100ms API response times.

---

## 🏛️ System Architecture

```text
  ┌──────────────────────────────────────────────────────────────────┐
  │                        REACT 18 FRONTEND                         │
  │   Vite + Tailwind CSS + Lucide Icons + Recharts + Leaflet GIS    │
  │   (WeatherContext, AuthContext, ThemeContext, Responsive SPA)    │
  └───────────────────────────────┬──────────────────────────────────┘
                                  │ HTTPS (JSON REST API / Axios)
                                  ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │                    NODE.JS / EXPRESS BACKEND                     │
  │  ┌────────────────────────────────────────────────────────────┐  │
  │  │ Security: Helmet, CORS, Dev-Bypass RateLimiter, CookieJWT  │  │
  │  └────────────────────────────┬───────────────────────────────┘  │
  │                               ▼                                  │
  │  ┌────────────────────────────────────────────────────────────┐  │
  │  │                      API CONTROLLERS                       │  │
  │  │   Auth | Weather | Location | AQI | Alerts | Analytics     │  │
  │  │   AI Grounding | Contact Us & Nodemailer Mailer            │  │
  │  └────────────────────────────┬───────────────────────────────┘  │
  │                               ▼                                  │
  │  ┌────────────────────────────────────────────────────────────┐  │
  │  │                       SERVICE LAYER                        │  │
  │  │  • weather.service.js  (Open-Meteo Normalizer & DB Cache)  │  │
  │  │  • scoreEngine.js      (Proprietary Sport Penalty Formula) │  │
  │  │  • gemini.service.js   (Context-Grounded Prompt Ingestion) │  │
  │  │  • aqi.service.js      (US-EPA Pollutant Categorization)   │  │
  │  │  • mail.service.js     (Dual-Routing Gmail SMTP Transporter)│ │
  │  └──────────────┬─────────────────────────────┬───────────────┘  │
  └─────────────────┼─────────────────────────────┼──────────────────┘
                    │                             │
        External API Calls (HTTPS)        Database Read/Write (Mongoose)
                    ▼                             ▼
  ┌─────────────────────────────────┐   ┌─────────────────────────────┐
  │      EXTERNAL PROVIDERS         │   │       MONGODB ATLAS         │
  │  • Open-Meteo Multi-Model API   │   │  • Users & Preferences      │
  │  • Open-Meteo Air Quality API   │   │  • Saved Locations          │
  │  • Google Gemini 1.5/2.0 API    │   │  • WeatherCache (TTL Index) │
  │  • BigDataCloud Reverse Geocode │   │  • Alerts & Conversation Log│
  └─────────────────────────────────┘   └─────────────────────────────┘
```

---

## 📦 Project Structure

```text
SkyCast/
├── client/                     # Frontend SPA (React 18 + Vite)
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── components/         # Modular Atomic UI Components
│   │   │   ├── activity/       # SmartScoreCard outdoor rating
│   │   │   ├── ai/             # AIChatDrawer floating widget
│   │   │   ├── alerts/         # AlertCard warning badges
│   │   │   ├── aqi/            # AQICard pollutant bars
│   │   │   ├── charts/         # WeatherAnalyticsChart (Recharts)
│   │   │   ├── layout/         # Navbar, Sidebar, Footer, PageWrapper
│   │   │   ├── map/            # WeatherMap (Leaflet GIS)
│   │   │   └── weather/        # WeatherCard, Hourly, Daily, Timeline
│   │   ├── context/            # WeatherContext, AuthContext, ThemeContext
│   │   ├── pages/              # 13 Complete Application Pages
│   │   ├── services/           # Axios API Client (with VITE_API_URL support)
│   │   ├── utils/              # Weather icons, formatters, unit helpers
│   │   ├── App.jsx             # React Router Provider & Route Matrix
│   │   └── main.jsx            # React DOM Entrypoint
│   ├── .env.example            # Client environment template
│   ├── vercel.json             # Vercel SPA client-side rewrite rules
│   ├── vite.config.js          # Vite bundler & local dev proxy configuration
│   └── package.json
│
├── server/                     # Backend REST API (Node.js + Express)
│   ├── src/
│   │   ├── config/             # MongoDB Atlas connection
│   │   ├── controllers/        # Weather, Auth, AI, Location, Contact controllers
│   │   ├── middleware/         # JWT Auth, RateLimiter, Error Handler
│   │   ├── models/             # Mongoose Schemas (User, Location, WeatherCache)
│   │   ├── routes/             # Express Route definitions (/api/v1/...)
│   │   └── services/           # Weather, Gemini, Score Engine, Mail Services
│   ├── .env.example            # Server environment template
│   ├── server.js               # Express Server Bootstrap & Health Check
│   └── package.json
│
├── .gitignore                  # Git exclusion rules (safeguards secrets & dist)
├── Architecture.md             # In-depth technical architecture & data flows
├── Design.md                   # UI/UX specification & design tokens
├── PRD.md                      # Product Requirements Document
└── README.md                   # Master Documentation (This file)
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** | High-performance reactive component architecture |
| **Build Tool** | **Vite 5** | Sub-second hot module replacement & optimized bundling |
| **Styling & Theme** | **Tailwind CSS 3** | Atmospheric glassmorphism, glowing ambients, and dark mode |
| **Icons & Visuals** | **Lucide React** | Featherweight vector iconography |
| **Data Visuals** | **Recharts** | Smooth interactive temperature & meteorological trends |
| **Geospatial Maps** | **Leaflet & React-Leaflet** | Multi-layer radar, wind, precipitation, and satellite GIS |
| **Backend Runtime** | **Node.js (ES Modules)** | Fast, asynchronous JavaScript server runtime |
| **API Framework** | **Express.js 4** | Robust REST routing, security headers, and rate limiting |
| **Database** | **MongoDB Atlas & Mongoose** | Document persistence with automatic TTL cache index |
| **AI Reasoning** | **Google Gemini API** | Grounded natural language atmospheric reasoning |
| **Email Service** | **Nodemailer (Gmail SMTP)** | Dual-channel contact inquiry and support ticket dispatch |
| **Authentication** | **JWT & bcryptjs** | Secure token-based auth with salted password hashing |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB**: Active MongoDB Atlas URI or local instance

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/SkyCast.git
cd SkyCast
```

### 2. Backend Setup (`server/`)
```bash
cd server
npm install
cp .env.example .env
# Fill in your MongoDB URI, Gemini API Key, and SMTP credentials in .env
npm start
```
*Backend runs on `http://localhost:5001`.*

### 3. Frontend Setup (`client/`)
```bash
cd ../client
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## ⚙️ Environment Configuration

### Server Environment Variables (`server/.env`)
```env
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Connection
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/skycast?appName=Weather-Forecast-System

# Security
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Google Gemini AI Key
GEMINI_API_KEY=your_gemini_api_key_here

# Nodemailer Mail Service
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=devkumar.workspace@gmail.com
SMTP_PASS=your_gmail_app_password
CONTACT_INQUIRY_RECEIVER=debkumarpayra32@gmail.com
SUPPORT_TICKET_RECEIVER=devkumar.workspace@gmail.com
```

### Client Environment Variables (`client/.env`)
```env
# Point to backend URL (in production, use your deployed Render API URL)
VITE_API_URL=http://localhost:5001
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Service uptime and status check | No |
| `GET` | `/api/v1/weather/current` | Real-time weather, feels-like, UV, & Activity Scores | No |
| `GET` | `/api/v1/weather/hourly` | 24-hour hourly meteorological forecast | No |
| `GET` | `/api/v1/weather/daily` | 7-day / 14-day high-low daily forecast | No |
| `GET` | `/api/v1/weather/precipitation` | 3-hour precipitation probability timeline | No |
| `GET` | `/api/v1/locations/search` | Global city, state, country geocoding search | No |
| `GET` | `/api/v1/locations/reverse` | Reverse GPS coordinates to city name | No |
| `GET` | `/api/v1/locations` | Retrieve user's saved favorite locations | Yes |
| `POST` | `/api/v1/locations` | Save location with custom category tag | Yes |
| `DELETE` | `/api/v1/locations/:id` | Remove a saved location | Yes |
| `GET` | `/api/v1/air-quality/current` | Real-time PM2.5, PM10, AQI index & advisories | No |
| `GET` | `/api/v1/alerts/active` | Severe weather anomaly warnings | No |
| `GET` | `/api/v1/analytics/trends` | Historical trends, today vs. yesterday charts | No |
| `POST` | `/api/v1/ai/chat` | Context-grounded Gemini AI weather consultation | No |
| `POST` | `/api/v1/contact` | Submit contact inquiry & trigger dual-channel email | No |
| `POST` | `/api/v1/auth/register` | User account registration | No |
| `POST` | `/api/v1/auth/login` | User login and JWT authentication | No |
| `POST` | `/api/v1/auth/logout` | Clear authentication session | Yes |

---

## 🤖 Grounded Gemini AI Integration

SkyCast utilizes the **Google Gemini API** with an **in-memory RAG grounding architecture**:
1. When a user asks an atmospheric question (*e.g., "Can I play football in Kolkata at 5 PM?"*), the backend fetches the verified real-time weather and 24-hour forecast from the local cache.
2. The proprietary `scoreEngine.js` computes the exact activity penalty score.
3. The system prompt injects this structured meteorological data into Gemini:
   ```text
   System: You are SkyCast AI. Base your answers strictly on the meteorological metrics:
   - Location: Kolkata (22.57°N, 88.36°E)
   - Current Temp: 28°C, Humidity: 82%, Rain: 15%
   - 5:00 PM Forecast: Heavy rain (70%), Wind 22 km/h
   - Football Activity Score: 32/100 (Unfavorable)
   ```
4. Gemini outputs an actionable, zero-hallucination recommendation with clothing, umbrella, and safety advice.

---

## 📬 Dual-Channel Support & Contact Mailer

When a user submits the Contact Us form:
1. **User Inquiry Email** is delivered directly to **`debkumarpayra32@gmail.com`** with the user's name, email, subject, and full message.
2. **Support Ticket Notification** is delivered directly to **`devkumar.workspace@gmail.com`** with the tracked ticket reference (e.g. `TKT-826997`), category, and timestamp.
3. **Acknowledgment Confirmation** is automatically sent to the sender's email address.

---

## 🌐 Deployment Guide

### Deploying the Backend to Render
1. Create a new **Web Service** on [Render.com](https://render.com) connected to your GitHub repository.
2. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
3. Add environment variables from `server/.env.example`.
4. Copy the live service URL (`https://skycast-server.onrender.com`).

### Deploying the Frontend to Vercel
1. Import your repository into [Vercel](https://vercel.com).
2. Settings:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
3. Environment Variables:
   - `VITE_API_URL=https://skycast-server.onrender.com`
4. Click **Deploy**. Vercel will build and assign your live domain.

---

## 📜 License

This project is licensed under the **MIT License**. Built with ❤️ by **Deb Kumar Payra** and the **SkyCast Meteorological Intelligence Team**.
