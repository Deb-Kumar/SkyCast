import { Router } from 'express';
import { submitContactForm } from '../controllers/contact.controller.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', apiLimiter, submitContactForm);

export default router;
