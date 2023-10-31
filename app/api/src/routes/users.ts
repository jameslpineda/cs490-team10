import express from 'express';
import * as UserController from '../controllers/usersController';

const router = express.Router();

router.get('/', UserController.getUsers);

export default router;
