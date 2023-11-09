import { Request, Response } from 'express';
import { TaskInterface } from '../interfaces/taskInterface';
import { updateTask } from '../services/taskService';
import asyncHandler from 'express-async-handler';
import { validateTaskStatusUpdate } from '../validations/taskValidation';

// @desc Updates task status
// @route POST /task/update
// @access Private
export const updateTaskStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = validateTaskStatusUpdate(req.body);
    if (validation.error) {
      res.status(422);
      throw new Error(validation.error.details[0].message);
    }

    const data: TaskInterface = {};

    if (req.body.status) {
      data.status = req.body.status;
    }

    const updatedTask = await updateTask({ _id: req.body.task_id }, data);

    if (!updatedTask) {
      res.status(404);
      throw new Error('Failed to update task.');
    }

    res.status(200).json({
      message: 'Task status updated successfully',
      updatedFields: Object.keys(data),
    });
  },
);
