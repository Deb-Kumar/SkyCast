import { Router } from 'express';
import { getAnalytics } from '../controllers/analytics.controller.js';

const router = Router();

router.get('/', getAnalytics);
router.get('/trends', getAnalytics);

export default router;
