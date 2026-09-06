# 🌦️ SkyCast — AI-Powered Weather Forecast & Climate Intelligence Platform

> A full-stack web application combining real-time meteorological data, multi-model forecasts, interactive weather maps, air-quality intelligence, severe-weather alerts, proprietary Smart Activity Scores, and a context-grounded Gemini AI assistant into one unified, glassmorphic dashboard.

---

## 📚 Project Documentation Hub

| Document | Description |
| :--- | :--- |
| 📄 **[PRD.md](file:///d:/Project/SkyCast/PRD.md)** | Product Requirements Document — feature breakdown, personas, and success metrics |
| 🏛️ **[Architecture.md](file:///d:/Project/SkyCast/Architecture.md)** | Technical Architecture — system diagrams, grounded AI flow, MongoDB schema, and REST API |
| 📜 **[Rules.md](file:///d:/Project/SkyCast/Rules.md)** | Engineering Rules — folder structure, coding conventions, security & caching standards |
| 🎨 **[Design.md](file:///d:/Project/SkyCast/Design.md)** | UI/UX & Design System — glassmorphic color palette, typography, and page wireframes |
| 🚀 **[Phases.md](file:///d:/Project/SkyCast/Phases.md)** | Implementation Roadmap — 7-phase step-by-step milestone delivery plan |
| 🧠 **[Memory.md](file:///d:/Project/SkyCast/Memory.md)** | System Memory & ADRs — active context and architectural decisions |

---

## 🌟 Key Highlights & Proprietary Features

- 🤖 **Grounded Gemini AI Assistant**: Natural language weather consulting injected with verified real-time weather and forecast data to eliminate hallucinations.
- 🎯 **Proprietary Smart Activity Score**: Evaluates temperature, precipitation risk, wind, UV, and AQI into custom outdoor feasibility scores (Football, Walking, Riding, Photography).
- 🌧️ **Precipitation Intelligence**: Detailed 3-hour precipitation probability timeline with start/stop projections.
- 🗺️ **Interactive Multi-Layer Weather Map**: Toggleable precipitation radar, temperature heatmaps, wind streams, and cloud cover.
- 🌫️ **Comprehensive Air Quality (AQI)**: Breakdown of PM2.5, PM10, NO₂, CO, O₃, SO₂ with targeted health recommendations.
- 🚨 **Severe Weather Alerts Engine**: Automated alerts for thunderstorms, heatwaves, cyclones, and hazardous AQI.
- 📊 **Visual Analytics & Historical Comparison**: Recharts-powered graphs comparing current metrics with yesterday and seasonal averages.
- ⚡ **Dual-Layer TTL Caching**: MongoDB TTL and coordinate normalization for sub-100ms response times.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Recharts, Leaflet / Mapbox, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose)
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Authentication**: JWT, bcryptjs, HTTP-only Secure Cookies
