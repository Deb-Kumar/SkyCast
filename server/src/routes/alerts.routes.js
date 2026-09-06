import { Router } from 'express';
import { getActiveAlerts } from '../controllers/alerts.controller.js';

const router = Router();

router.get('/active', getActiveAlerts);
router.get('/', getActiveAlerts);

export default router;
