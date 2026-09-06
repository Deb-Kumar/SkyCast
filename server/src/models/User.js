import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxLength: [60, 'Name cannot exceed 60 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    passwordHash: {
      type: String,
      required: [true, 'Please provide a password']
    },
    avatar: {
      type: String,
      default: ''
    },
    preferences: {
      temperatureUnit: {
        type: String,
        enum: ['C', 'F'],
        default: 'C'
      },
      windSpeedUnit: {
        type: String,
        enum: ['kmh', 'mph', 'ms'],
        default: 'kmh'
      },
      timeFormat: {
        type: String,
        enum: ['12h', '24h'],
        default: '12h'
      },
      theme: {
        type: String,
        enum: ['dark', 'light', 'system'],
        default: 'dark'
      },
      notifications: {
        rain: { type: Boolean, default: true },
        severeWeather: { type: Boolean, default: true },
        aqi: { type: Boolean, default: false },
        dailySummary: { type: Boolean, default: true }
      }
    }
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
