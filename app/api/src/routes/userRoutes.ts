import express from 'express';
import * as UserController from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

// router.get('/user-info', UserController.getUsers);
router.get('/me', protect, UserController.getMe);

export default router;
