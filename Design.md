# 🎨 SkyCast — Design System & UI/UX Specifications

---

## 1. Design Aesthetics & Visual Philosophy

SkyCast implements a **sleek, atmospheric glassmorphism** design language that adapts dynamically to current meteorological conditions.

- **Atmospheric Immediacy**: Background gradients and ambient glows subtly shift based on whether the active location is experiencing clear sun, rain, thunderstorms, or night sky.
- **Glassmorphism & Depth**: Multi-layered backdrop-blurred containers (`backdrop-blur-xl bg-slate-900/60 border border-white/10`) give cards a clean, modern aesthetic.
- **Information Hierarchy**: High-impact metrics (Temperature, Condition, Outdoor Score) dominate visual attention, backed by clear secondary metric grids.

---

## 2. Color Palette & Theming Tokens

### 2.1 Core Dark Mode Palette (Default)
| Token | Hex / RGBA | Role / Usage |
| :--- | :--- | :--- |
| `--bg-base` | `#0B0F19` | Deep space canvas background |
| `--bg-surface` | `rgba(17, 24, 39, 0.75)` | Glassmorphic card surfaces |
| `--bg-card-hover` | `rgba(30, 41, 59, 0.85)` | Interactive element hover state |
| `--border-glass` | `rgba(255, 255, 255, 0.10)` | Delicate card & divider borders |
| `--text-primary` | `#F8FAFC` (Slate 50) | Main headings, major numbers |
| `--text-secondary`| `#94A3B8` (Slate 400) | Metric labels, subheaders |
| `--text-muted` | `#64748B` (Slate 500) | Timestamps, minor notes |

### 2.2 Dynamic Weather Accent Colors
| Condition | Primary Accent | Gradient Glow |
| :--- | :--- | :--- |
| **Sunny / Clear Day** | `#F59E0B` (Amber) | `radial-gradient(circle, #F59E0B22 0%, transparent 70%)` |
| **Rain / Drizzle** | `#06B6D4` (Cyan) | `radial-gradient(circle, #06B6D422 0%, transparent 70%)` |
| **Thunderstorm** | `#8B5CF6` (Purple/Indigo) | `radial-gradient(circle, #8B5CF625 0%, transparent 70%)` |
| **Snow / Cold** | `#38BDF8` (Sky Blue) | `radial-gradient(circle, #38BDF822 0%, transparent 70%)` |
| **Severe Alert / Heat** | `#EF4444` (Rose / Red) | `radial-gradient(circle, #EF444422 0%, transparent 70%)` |

### 2.3 Air Quality Index (AQI) Spectrum
- 🟢 **Good (0–50)**: `#10B981` (Emerald)
- 🟡 **Moderate (51–100)**: `#FBBF24` (Amber)
- 🟠 **Unhealthy for Sensitive (101–150)**: `#F97316` (Orange)
- 🔴 **Unhealthy (151–200)**: `#EF4444` (Red)
- 🟣 **Very Unhealthy (201–300)**: `#8B5CF6` (Purple)
- 🟤 **Hazardous (301+)**: `#881337` (Maroon)

---

## 3. Typography Hierarchy

- **Primary Font**: `Outfit` / `Inter`, sans-serif (Google Fonts)
- **Data / Number Font**: `Plus Jakarta Sans` / `Outfit` with tabular numbers (`font-variant-numeric: tabular-nums`)

```text
Display 1 (Hero Temperature):  64px / 72px — Bold (700)
Heading 1 (Page Titles):        32px / 40px — SemiBold (600)
Heading 2 (Card Titles):        20px / 28px — Medium (500)
Body Large:                     16px / 24px — Regular (400)
Body Small / Metadata:          13px / 18px — Regular (400)
Metric Tag / Badge:             11px / 14px — Bold (700) uppercase
```

---

## 4. UI Layout & Page Specifications

### 4.1 Master Shell Layout
For all dashboard pages (`/dashboard`, `/forecast`, `/map`, `/air-quality`, `/analytics`, `/alerts`, `/ai-weather`, `/locations`, `/settings`):
- **Top Navigation Bar**: Logo & Brand, Search input with auto-complete dropdown, Geolocation trigger button, Notifications badge popover, Profile avatar dropdown.
- **Collapsible Sidebar**: Navigation links with icons (Dashboard, Forecast, Radar Map, Air Quality, Analytics, Severe Alerts, Gemini AI, Saved Locations, Settings).
- **Main Canvas**: Responsive glassmorphic grid with fluid scrolling.

---

### 4.2 Page Wireframes & Blueprints

#### Page 1: Landing Page (`/`)
- **Navbar**: Brand logo, Feature links, Live preview pill, "Get Started" & "Sign In" buttons.
- **Hero Section**: "Understand Your Weather. Before It Happens."
  - Search bar with instant autocomplete.
  - "Use My Current Location" button.
- **Live Weather Hero Card**: Realistic interactive glass card showing current local weather.
- **Feature Highlights Grid**: Smart Activity Score, Gemini AI Assistant, Radar Map, Severe Weather Engine.
- **AI Demo Carousel**: Visual chat previews of grounded weather conversations.
- **Footer**: Quick links, tech stack badges, copyright.

---

#### Page 2 & 3: Authentication (`/login`, `/register`)
- Centered glass card (`max-w-md`) with subtle ambient aurora animated background.
- Fields with floating labels, password visibility toggles, OAuth social buttons ("Continue with Google"), and form error validation feedback.

---

#### Page 4: Main Dashboard (`/dashboard`)
```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Current Weather Hero Card]                      │ [Smart Activity Score Widget]│
│  Kolkata, India 📍 (Home)                         │  Outdoor Score: 84/100 🟢    │
│  ☀️ 31°C  Clear Sky                              │  ⚽ Football: 86  🚶 Walk: 94│
│  Feels like 34°C • High: 33° Low: 24°            │  🏍️ Riding: 72   📸 Photo: 88│
├──────────────────────────────────────────────────┴──────────────────────────────┤
│ [Precipitation Intelligence Timeline (Next 3 Hours)]                            │
│  NOW ─── 30m ─── 1h ─── 1.5h ─── 2h ─── 2.5h ─── 3h                             │
│  ☁️ 10%  🌧️ 65%  🌧️ 85%  🌧️ 70%  ☁️ 30%   ☀️ 5%    ☀️ 0%                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ [Quick Metrics 4-Col Grid]                                                      │
│  💧 Humidity: 76%  │ 💨 Wind: 14 km/h ESE │ ☀️ UV: 7 (High) │ 🌫️ AQI: 82 (Mod) │
├──────────────────────────────────────────────────┬──────────────────────────────┤
│ [24-Hour Hourly Curve Scrollable]                │ [AI Quick Insight Card]      │
│  Horizontal timeline cards with temp graph       │ "Rain probability peaks at   │
│                                                  │  3 PM. Carry an umbrella."   │
├──────────────────────────────────────────────────┴──────────────────────────────┤
│ [7-Day Daily Forecast Overview Cards]                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

#### Page 5: Comprehensive Forecast (`/forecast`)
- **Tab Selector**: 24-Hour Hourly | 7-Day Forecast | 14-Day Extended.
- **Interactive Day Selector**: Clicking any day expands a detailed drawer showing hourly breakdown, UV curves, barometric pressure, wind gusts, dew point, and sunrise/sunset timeline.

---

#### Page 6: Interactive Weather Map (`/map`)
- Full-viewport interactive Leaflet/Mapbox canvas.
- **Floating Layer Switcher (Top Right)**:
  - 🌧️ Precipitation Radar
  - 🌡️ Temperature Heatmap
  - 💨 Wind Particle Streams
  - ☁️ Cloud Satellite
  - 🌫️ Air Quality Index
- **Map Controls (Bottom Center)**: Play/Pause timeline animation for forecasted precipitation radar.

---

#### Page 7: Air Quality Index (`/air-quality`)
- **Main Gauge**: Radial gauge displaying current AQI score and safety category.
- **Pollutant Breakdown Grid**: Individual metric cards for PM2.5, PM10, NO₂, CO, O₃, SO₂ with standard comparison limits.
- **Health Advisories**: Segmented advice for General Public, Elderly, Children, and Asthma/Respiratory patients.
- **24-Hour AQI Trend Chart**: Interactive area chart showing pollutant forecasts.

---

#### Page 8: Weather Analytics & Historical Trends (`/analytics`)
- **Time Range Filters**: `Last 24 Hours` | `7 Days` | `30 Days` | `Custom`.
- **Chart Deck (Recharts)**:
  - Temperature High/Low variation lines with average reference line.
  - Precipitation volume bar charts (mm).
  - Humidity vs. Dew Point correlation graph.
  - Wind speed & gust velocity tracking.
- **Historical Comparison Card**: Compares current metrics against yesterday and seasonal averages.

---

#### Page 9: Severe Weather Alerts (`/alerts`)
- **Status Filter**: `All` | `Active (Urgent)` | `Resolved`.
- **Alert Cards**: Highlighted in color-coded severity borders (Moderate Yellow, Severe Red, Extreme Purple).
- **Card Content**: Weather anomaly title, affected zone, start/end timestamps, hazard description, and recommended action steps.

---

#### Page 10: Grounded Gemini AI Assistant (`/ai-weather`)
- **Chat Interface**: Clean conversation stream with user messages and formatted AI bubbles.
- **Prompt Recommendation Chips**:
  - *"Will it rain during my evening commute?"*
  - *"Is tomorrow suitable for photography in Kolkata?"*
  - *"What should I wear for tomorrow's temperature drop?"*
  - *"Compare weather in my saved locations."*
- **Context Badge**: Displays the active weather dataset injected into the current conversation turn.

---

#### Page 11: Saved Locations Manager (`/locations`)
- Grid of saved location cards with live temperature badges.
- Actions: Add New Location, Rename / Assign Tag (Home/Work/College), Set as Default, Remove.
- Instant click to switch active global context.

---

#### Page 12: Profile & Preferences (`/settings`)
- **Account**: User details, profile photo, password update.
- **Measurement Units**: Toggle °C / °F, km/h / mph / m/s, 12h / 24h.
- **Theme**: Dark, Light, Auto-System.
- **Notification Toggles**: Instant browser notification toggles for Rain, Extreme Heat, Storms, and Hazardous AQI.

---

## 5. Animations & Micro-Interactions (Framer Motion)

- **Page Transitions**: Smooth subtle fade & slide (`opacity: 0, y: 8` -> `opacity: 1, y: 0`).
- **Card Hover States**: Slight elevation and glowing border highlight (`scale: 1.01, borderColor: rgba(255,255,255,0.2)`).
- **Radial Score Animation**: Smooth counter animation from 0 to target score on load.
- **Precipitation Radar Pulses**: Dynamic pulsing radar dot on active location marker.
