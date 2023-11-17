import express from 'express';
import * as TaskController from '../controllers/taskController';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', requireAuth, TaskController.createTaskHandler);
router.get('/retrieve', requireAuth, TaskController.retrieveTasksHandler);
router.put('/update/:id', requireAuth, TaskController.updateTaskHandler);

export default router;
