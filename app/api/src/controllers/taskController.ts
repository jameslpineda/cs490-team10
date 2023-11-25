import { Response } from 'express';
import moment from 'moment';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import { TaskInterface } from '../interfaces/taskInterface';
import {
  createTask,
  getTasksByDate,
  updateTask,
} from '../services/taskService';
import asyncHandler from 'express-async-handler';
import {
  createTaskValidation,
  updateTaskValidation,
} from '../validations/taskValidation';

// @desc Creates a task
// @route POST /task/create
// @access Private
export const createTaskHandler = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const validation = createTaskValidation(req.body);
    if (validation.error) {
      res.status(422);
      throw new Error(validation.error.details[0].message);
    }

    const data: TaskInterface = { user_id: req.user_id, ...req.body };

    const createdTask = await createTask(data);

    if (!createdTask) {
      throw new Error('Failed to create task');
    }

    res.status(200).json({
      message: 'Task created: ' + createdTask.name,
    });
  },
);

// @desc Retrieves tasks on specific date
// @route GET /task/retrieve
// @access Private
export const retrieveTasksHandler = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const date = req.query.date;

    if (!date) {
      res.status(422);
      throw new Error('Missing date in query');
    }
    const from = moment(date as string).startOf('day');
    const to = moment(from).add(1, 'day');

    // Get all tasks by date
    const data = {
      user_id: req.user_id,
      date: { $gte: from.toDate(), $lt: to.toDate() },
    };
    const retrievedTasks = await getTasksByDate(data);

    res.status(200).json(retrievedTasks);
  },
);

// @desc Updates a task
// @route PUT /task/update/:id
// @access Private
export const updateTaskHandler = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const task_id = req.params.id;

    const validation = updateTaskValidation(req.body);
    if (validation.error) {
      res.status(422);
      throw new Error(validation.error.details[0].message);
    }

    const data: TaskInterface = {};

    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.status) {
      data.status = req.body.status;
    }
    if (req.body.timers) {
      data.timers = req.body.timers;
    }
    if (req.body.completed_timers) {
      data.completed_timers = req.body.completed_timers;
    }
    if (req.body.notes) {
      data.notes = req.body.notes;
    }
    if (req.body.priority) {
      data.priority = req.body.priority;
    }
    if (req.body.date) {
      data.date = moment(req.body.date).startOf('day').toDate();
    }

    const updatedTask = await updateTask({ _id: task_id }, data);

    if (!updatedTask) {
      throw new Error('Failed to update task.');
    }

    res.status(200).json({
      message: 'Task status updated successfully',
      updatedFields: Object.keys(data),
    });
  },
);
