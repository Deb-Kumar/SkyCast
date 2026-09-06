import { Router } from 'express';
import { handleAIChat, getConversationHistory } from '../controllers/ai.controller.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.post('/chat', optionalAuth, handleAIChat);
router.get('/conversations', optionalAuth, getConversationHistory);

export default router;
