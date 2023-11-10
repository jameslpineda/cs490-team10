import { Request, Response } from 'express';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import { TaskInterface } from '../interfaces/taskInterface';
import { updateTask } from '../services/taskService';
import asyncHandler from 'express-async-handler';
import { validateTask } from '../validations/taskValidation';

// @desc Updates task status
// @route PUT /task/update
// @access Private
export const updateTaskData = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const validation = validateTask(req.body);
    if (validation.error) {
      res.status(422);
      throw new Error(validation.error.details[0].message);
    }

    const data: TaskInterface = {};

    if (req.body.status) {
      data.status = req.body.status;
    }
    if (req.body.timers) {
      data.timers = req.body.timers;
    }

    if (req.body.notes) {
      data.notes = req.body.notes;
    }

    if (req.body.priority) {
      data.priority = req.body.priority;
    }

    const updatedTask = await updateTask({ _id: req.body.task_id }, data);

    if (!updatedTask) {
      res.status(400);
      throw new Error('Failed to update task.');
    }

    res.status(200).json({
      message: 'Task status updated successfully',
      updatedFields: Object.keys(data),
    });
  },
);
