import express from 'express';
import * as RegisterController from '../controllers/registerController';

const router = express.Router();

router.post('/register-user', RegisterController.registerUserHandler);
router.get('/verify-user', RegisterController.verifyUserHandler);

export { router as registerRoutes };
