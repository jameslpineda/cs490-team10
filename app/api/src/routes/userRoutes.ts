import express from 'express';
import * as UserController from '../controllers/userController';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

router.get('/info', requireAuth, UserController.info);
router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.post('/sign-out', UserController.signOut);
router.get('/verify', UserController.verify);
router.post('/update', requireAuth, UserController.update);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.get('/refresh-token', UserController.refreshToken);

export default router;
