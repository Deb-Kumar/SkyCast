import mongoose from 'mongoose';
import dns from 'dns';

// Configure reliable DNS servers (Google DNS & Cloudflare) for MongoDB Atlas SRV record resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (dnsErr) {
  console.warn('Could not set custom DNS servers:', dnsErr.message);
}

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skycast';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host} - Weather Forecast System`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection error: ${error.message}. Running with resilient in-memory fallback store.`);
    isConnected = false;
  }
};

export const getDBStatus = () => isConnected;
