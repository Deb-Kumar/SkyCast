import { Router } from 'express';
import { getCurrentAQI } from '../controllers/aqi.controller.js';

const router = Router();

router.get('/current', getCurrentAQI);
router.get('/', getCurrentAQI);

export default router;
