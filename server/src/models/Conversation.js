import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true
    },
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    locationName: {
      type: String,
      default: ''
    },
    latitude: Number,
    longitude: Number,
    messages: [
      {
        role: {
          type: String,
          enum: ['user', 'model', 'system'],
          required: true
        },
        content: {
          type: String,
          required: true
        },
        groundedMetrics: {
          temp: Number,
          condition: String,
          rainChance: Number,
          aqi: Number,
          outdoorScore: Number
        },
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);
export default Conversation;
