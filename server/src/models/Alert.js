import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['rain', 'thunderstorm', 'heatwave', 'coldwave', 'wind', 'aqi', 'cyclone', 'flood'],
      required: true
    },
    severity: {
      type: String,
      enum: ['low', 'moderate', 'severe', 'extreme'],
      default: 'moderate'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    instruction: {
      type: String,
      default: 'Stay updated with local weather forecasts.'
    },
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'resolved'],
      default: 'active'
    }
  },
  { timestamps: true }
);

const Alert = mongoose.models.Alert || mongoose.model('Alert', alertSchema);
export default Alert;
