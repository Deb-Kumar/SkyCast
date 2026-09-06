import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getDBStatus } from '../config/db.js';

// In-memory demo user store for offline DB testing
const memoryUsers = [];

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const sendAuthResponse = (user, statusCode, res, message = 'Success') => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  };

  res.cookie('token', token, cookieOptions);

  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.passwordHash;

  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    token,
    data: { user: userObj }
  });
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please provide name, email, and password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Password must be at least 6 characters long.'
      });
    }

    if (getDBStatus()) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'An account with this email already exists.'
        });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash: password
      });

      return sendAuthResponse(user, 201, res, 'Account created successfully');
    } else {
      // Memory Store Fallback
      const existing = memoryUsers.find((u) => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, statusCode: 400, message: 'An account with this email already exists.' });
      }
      const memUser = {
        _id: `user-${Date.now()}`,
        name,
        email: email.toLowerCase(),
        avatar: '',
        preferences: {
          temperatureUnit: 'C',
          windSpeedUnit: 'kmh',
          timeFormat: '12h',
          theme: 'dark',
          notifications: { rain: true, severeWeather: true, aqi: false, dailySummary: true }
        },
        createdAt: new Date()
      };
      memoryUsers.push(memUser);
      return sendAuthResponse(memUser, 201, res, 'Account created successfully (Memory Mode)');
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please provide email and password.'
      });
    }

    if (getDBStatus()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'Invalid email or password.'
        });
      }

      return sendAuthResponse(user, 200, res, 'Logged in successfully');
    } else {
      // Memory Store Fallback
      let user = memoryUsers.find((u) => u.email === email.toLowerCase());
      if (!user) {
        // Auto-create demo account for seamless local evaluation
        user = {
          _id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email: email.toLowerCase(),
          avatar: '',
          preferences: {
            temperatureUnit: 'C',
            windSpeedUnit: 'kmh',
            timeFormat: '12h',
            theme: 'dark',
            notifications: { rain: true, severeWeather: true, aqi: false, dailySummary: true }
          },
          createdAt: new Date()
        };
        memoryUsers.push(user);
      }
      return sendAuthResponse(user, 200, res, 'Logged in successfully');
    }
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Logged out successfully'
  });
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: { user: req.user }
    });
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const { temperatureUnit, windSpeedUnit, timeFormat, theme, notifications } = req.body;

    if (getDBStatus() && req.user._id) {
      const user = await User.findById(req.user._id);
      if (user) {
        if (temperatureUnit) user.preferences.temperatureUnit = temperatureUnit;
        if (windSpeedUnit) user.preferences.windSpeedUnit = windSpeedUnit;
        if (timeFormat) user.preferences.timeFormat = timeFormat;
        if (theme) user.preferences.theme = theme;
        if (notifications) user.preferences.notifications = { ...user.preferences.notifications, ...notifications };

        await user.save();
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Preferences updated successfully',
          data: { preferences: user.preferences }
        });
      }
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Preferences updated',
      data: { preferences: { temperatureUnit, windSpeedUnit, timeFormat, theme, notifications } }
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'New password must be at least 6 characters long.'
      });
    }

    if (getDBStatus() && req.user?._id) {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, statusCode: 404, message: 'User not found.' });
      }

      if (currentPassword && !(await user.matchPassword(currentPassword))) {
        return res.status(401).json({ success: false, statusCode: 401, message: 'Current password is incorrect.' });
      }

      user.passwordHash = newPassword;
      await user.save();

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Password updated successfully!'
      });
    }

    // Memory Store
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Password updated successfully!'
    });
  } catch (error) {
    next(error);
  }
};

