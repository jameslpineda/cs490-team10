import express from 'express';
import * as UserController from '../controllers/userController';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

router.get('/info', requireAuth, UserController.info);
router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.get('/verify', UserController.verify);
router.post('/update', requireAuth, UserController.update);

export default router;
