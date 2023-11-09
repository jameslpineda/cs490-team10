import express from 'express';
import * as TaskController from '../controllers/taskController';
import requireAuth from '../middleware/authMiddleware';
const router = express.Router();
router.put('/status-update', requireAuth, TaskController.updateTaskStatus);
export default router;