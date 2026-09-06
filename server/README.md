# 🌦️ SkyCast Backend (Server)

The Node.js / Express REST API and Meteorological Processing Engine for the **SkyCast AI-Powered Weather Forecast Platform**.

---

## 🚀 Features

- **Multi-Model Meteorological Feeds**: Integrated with Open-Meteo multi-model weather and air quality telemetry.
- **MongoDB TTL Caching**: Normalized coordinate caching with automatic TTL index expiration to guarantee sub-100ms response times and minimize external API calls.
- **Proprietary Smart Activity Score**: Multi-factor penalty algorithm calculating outdoor suitability (0–100) for Football, Walking/Running, Riding, and Photography.
- **Context-Grounded Gemini AI**: Real-time atmospheric RAG injection into Google Gemini 1.5/2.0 API with zero hallucinations.
- **Dual-Channel Nodemailer Service**: Gmail SMTP transport routing user inquiries to `debkumarpayra32@gmail.com` and ticket tracking logs to `devkumar.workspace@gmail.com`.
- **JWT Authentication & Security**: Helmet, CORS with localhost / client URL whitelist, salted password hashing with `bcryptjs`, and generous development-mode rate limiting.

---

## 🛠️ Tech Stack

- **Node.js (ES Modules)** & **Express.js 4**
- **MongoDB Atlas** with **Mongoose 8**
- **Google Gemini API** (`@google/generative-ai`)
- **Nodemailer** (Gmail SMTP)
- **jsonwebtoken** & **bcryptjs**
- **Helmet**, **CORS**, **Cookie-Parser**, **Express-Rate-Limit**

---

## 📦 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB Atlas URI, Gemini API Key, and SMTP credentials

# 3. Start development server
npm start
```

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/skycast?appName=Weather-Forecast-System
JWT_SECRET=your_secret_jwt_key
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key

# Nodemailer SMTP Configuration
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=devkumar.workspace@gmail.com
SMTP_PASS=your_gmail_app_password
CONTACT_INQUIRY_RECEIVER=debkumarpayra32@gmail.com
SUPPORT_TICKET_RECEIVER=devkumar.workspace@gmail.com
```

---

## 🌐 Deploy to Render

1. Create a new **Web Service** on **[Render](https://render.com)**.
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add the Environment Variables listed above.
