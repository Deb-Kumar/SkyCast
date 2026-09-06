# 🧠 SkyCast — System Memory & Project Context

---

## 1. Project Overview & Identity

- **Project Name**: SkyCast (AI-Powered Weather Forecast & Climate Intelligence Platform)
- **Root Directory**: `d:\Project\SkyCast`
- **Application Type**: Full-Stack Web Application (SPA + REST API)
- **Primary Objective**: Deliver a premier, glassmorphic weather platform combining hyper-local forecasts, interactive radar maps, AQI intelligence, proprietary Smart Activity Scores, and a context-grounded Gemini AI Weather Assistant.

---

## 2. Technology Stack & Key Libraries

| Tier | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 (Vite) | Fast component rendering and SPA routing |
| **Styling & Design** | Tailwind CSS + Custom Glassmorphic Utilities | Sleek atmospheric dark/light theming |
| **Animations** | Framer Motion | Smooth card transitions and micro-interactions |
| **Icons** | Lucide React | Clean, modern UI and weather condition iconography |
| **Charts & Visuals** | Recharts | Analytics, temperature curves, precipitation bars |
| **Mapping Engine** | Leaflet / React-Leaflet (or Mapbox GL) | Interactive radar & weather layer tiles |
| **Backend Runtime** | Node.js + Express.js | High-concurrency RESTful API service |
| **Database & Cache** | MongoDB Atlas + Mongoose | Data persistence and TTL auto-expiring cache |
| **AI Intelligence** | Google Gemini 1.5 / 2.0 API (`@google/genai`) | Grounded natural language weather reasoning |
| **Security & Auth** | JWT (`jsonwebtoken`), `bcryptjs`, `helmet`, `cors`, `express-rate-limit` | Secure token cookies and attack prevention |

---

## 3. Key Architectural Decisions (ADRs)

### ADR 01: Grounded RAG Architecture for Gemini AI
- **Decision**: Never send raw, ungrounded prompts to Gemini. The backend must query the verified weather/forecast cache for the target coordinates and inject structured meteorological metrics into the system prompt.
- **Rationale**: Eliminates LLM hallucinations and ensures weather recommendations (e.g. umbrella, clothing, sports) are 100% accurate to real data.

### ADR 02: Dual-Layer In-Memory & MongoDB TTL Caching
- **Decision**: Coordinate keys are rounded to 2 decimal places (`lat.toFixed(2)_lon.toFixed(2)`). Weather records expire automatically after 20 minutes using MongoDB TTL indexing (`expires: 0`).
- **Rationale**: Reduces external API calls by > 80%, keeps latency under 100ms, and avoids exceeding free-tier rate limits.

### ADR 03: Proprietary Smart Activity Score Engine
- **Decision**: Weather metrics (temperature sweet spots, rain probability, wind speeds, UV index, and AQI) are processed through a weighted penalty formula to compute activity feasibility scores (0–100) for Football, Walking, Riding, Photography, and Outdoors.
- **Rationale**: Transforms passive numbers into proactive, actionable insights for end users.

### ADR 04: Pure Web-Only Responsive Architecture
- **Decision**: Single responsive web codebase covering Desktop, Laptop, Tablet, and Mobile viewport breakpoints without requiring separate native iOS/Android builds.
- **Rationale**: Simplifies maintenance while ensuring 100% device reach through mobile browsers and PWA readiness.

---

## 4. Current State & Documentation Baseline

- [x] **PRD.md**: Comprehensive requirements, feature specifications, personas, and success metrics created.
- [x] **Architecture.md**: System topology, data flow, MongoDB models, REST API specifications, and security model documented.
- [x] **Rules.md**: Coding standards, folder structure, API response contracts, and caching mandates defined.
- [x] **Design.md**: UI/UX specifications, glassmorphic color palette, typography, and page wireframes established.
- [x] **Phases.md**: 7-phase implementation roadmap structured.
- [x] **Memory.md**: System memory baseline and architectural context initialized.

---

## 5. Environment Variables Blueprint (`server/.env.example`)

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/skycast?retryWrites=true&w=majority

# Authentication Secrets
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Third-Party APIs
GEMINI_API_KEY=your_google_gemini_api_key_here
WEATHER_API_KEY=your_weather_provider_api_key_here
```
