import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // String to support both guest/demo users and authenticated ObjectId strings
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    tag: {
      type: String,
      enum: ['home', 'work', 'college', 'favorite', 'custom'],
      default: 'favorite'
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      default: ''
    },
    country: {
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
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
export default Location;
