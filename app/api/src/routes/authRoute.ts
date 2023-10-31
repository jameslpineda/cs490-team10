import express from 'express';
import * as AuthController from '../controllers/authController';

const router = express.Router();

router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/login', AuthController.login);

export { router as authRoutes };
