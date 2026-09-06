import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { connectDB } from './src/config/db.js';

const startServer = async () => {
  // Connect Database
  await connectDB();

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 SkyCast Server is operational at http://localhost:${PORT}`);
    console.log(`🌍 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🌦️  Weather API Base: http://localhost:${PORT}/api/v1/weather`);
  });
};

startServer();
