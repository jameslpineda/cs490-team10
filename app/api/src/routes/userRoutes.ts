import express from 'express';
import * as UserController from '../controllers/usersController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

// router.get('/user-info', UserController.getUsers);
router.get('/me', protect, UserController.getMe);

export default router;
