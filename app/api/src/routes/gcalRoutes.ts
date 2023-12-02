import express from 'express';
import * as GcalController from '../controllers/gcalController';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

router.get('/create-auth', requireAuth, GcalController.createAuth);
router.post('/create-tokens', requireAuth, GcalController.createTokens);

export default router;
