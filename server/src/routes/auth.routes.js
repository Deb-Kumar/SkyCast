import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getMe, updatePreferences, updatePassword } from '../controllers/auth.controller.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/logout', logoutUser);
router.get('/me', requireAuth, getMe);
router.put('/preferences', optionalAuth, updatePreferences);
router.put('/password', optionalAuth, updatePassword);

export default router;
