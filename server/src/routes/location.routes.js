import { Router } from 'express';
import {
  searchLocations,
  getSavedLocations,
  addSavedLocation,
  deleteSavedLocation,
  reverseGeocodeLocation
} from '../controllers/location.controller.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/search', searchLocations);
router.get('/reverse', reverseGeocodeLocation);
router.get('/', optionalAuth, getSavedLocations);
router.post('/', optionalAuth, addSavedLocation);
router.delete('/:id', optionalAuth, deleteSavedLocation);

export default router;
