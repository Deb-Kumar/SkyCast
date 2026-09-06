import { searchGeocoding, reverseGeocode } from '../services/weather.service.js';
import Location from '../models/Location.js';
import { getDBStatus } from '../config/db.js';

// Memory store for locations if MongoDB is offline
const memoryLocations = [
  { _id: 'loc-1', userId: 'demo', name: 'Home', tag: 'home', city: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, isDefault: true },
  { _id: 'loc-2', userId: 'demo', name: 'Work / Campus', tag: 'work', city: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, isDefault: false },
  { _id: 'loc-3', userId: 'demo', name: 'Vacation Spot', tag: 'favorite', city: 'Digha', state: 'West Bengal', country: 'India', latitude: 21.6266, longitude: 87.5074, isDefault: false }
];

export const reverseGeocodeLocation = async (req, res, next) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    if (!lat || !lon) {
      return res.status(400).json({ success: false, statusCode: 400, message: 'Latitude and longitude required.' });
    }
    const result = await reverseGeocode(lat, lon);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const searchLocations = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    const results = await searchGeocoding(query);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: { results }
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedLocations = async (req, res, next) => {
  try {
    const userId = req.user?._id || 'demo';

    if (getDBStatus()) {
      const locations = await Location.find({ userId }).sort({ isDefault: -1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        statusCode: 200,
        data: { locations }
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: { locations: memoryLocations }
    });
  } catch (error) {
    next(error);
  }
};

export const addSavedLocation = async (req, res, next) => {
  try {
    const userId = req.user?._id || 'demo';
    const { name, tag = 'favorite', city, state, country, latitude, longitude, isDefault = false } = req.body;

    if (!city || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'City, latitude, and longitude are required.'
      });
    }

    if (getDBStatus()) {
      if (isDefault) {
        await Location.updateMany({ userId }, { isDefault: false });
      }

      const newLoc = await Location.create({
        userId,
        name: name || city,
        tag,
        city,
        state: state || '',
        country: country || '',
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        isDefault
      });

      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Location saved successfully',
        data: { location: newLoc }
      });
    }

    const newLoc = {
      _id: `loc-${Date.now()}`,
      userId,
      name: name || city,
      tag,
      city,
      state: state || '',
      country: country || '',
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      isDefault
    };
    memoryLocations.push(newLoc);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Location saved',
      data: { location: newLoc }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSavedLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || 'demo';

    if (getDBStatus()) {
      await Location.findOneAndDelete({ _id: id, userId });
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Location removed successfully'
      });
    }

    const index = memoryLocations.findIndex((l) => l._id === id);
    if (index !== -1) memoryLocations.splice(index, 1);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Location removed'
    });
  } catch (error) {
    next(error);
  }
};
