/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { sortNewTasks } from '../utils/sortNewTasks';
import { addFocusEvents } from './gcalController';

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

    if ('name' in req.body) {
      data.name = req.body.name;
    }
    if ('status' in req.body) {
      data.status = req.body.status;
    }
    if ('timers' in req.body) {
      data.timers = req.body.timers;
    }
    if ('completed_timers' in req.body) {
      data.completed_timers = req.body.completed_timers;
    }
    if ('notes' in req.body) {
      data.notes = req.body.notes;
    }
    if ('priority' in req.body) {
      data.priority = req.body.priority;
    }
    if ('date' in req.body) {
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

// @desc Plans a new day with updated tasks
// @route POST /task/plan
// @access Private
export const planTaskHandler = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const date = req.query.date;

    if (!date) {
      res.status(422).json({ error: 'Missing date in query' });
    }

    // Retrieves tasks from prior day
    const from = moment(date as string)
      .subtract(1, 'days')
      .startOf('day');
    const to = moment(from).add(1, 'day');

    const today = moment(date as string)
      .startOf('day')
      .toDate();

    const data = {
      user_id: req.user_id,
      date: { $gte: from.toDate(), $lt: to.toDate() },
      status: {
        $nin: [
          'Task is complete',
          'Task is deleted',
          'Task rolled over to the next day',
        ],
      },
    };
    const tasksToUpdate = await getTasksByDate(data);

    // Updates the old task to rolled over
    tasksToUpdate?.forEach(async (task) => {
      const updatedTask = await updateTask(
        { _id: task._id, status: 'Task has not been started' },
        { status: 'Task rolled over to the next day' },
      );
      if (!updatedTask) {
        throw new Error('Failed to update tasks with new status');
      }
    });

    tasksToUpdate?.forEach(async (task) => {
      const newTask = await createTask({
        user_id: task.user_id,
        notes: task.notes,
        name: task.name,
        timers: task.timers,
        completed_timers: 0,
        priority: task.priority,
        status: 'Task has not been started',
        date: today,
      });
      if (!newTask) {
        throw new Error('Failed to create new tasks');
      }
    });

    // Retrieves all tasks for current day
    const todayData = {
      user_id: req.user_id,
      date: { $gte: today, $lt: moment(today).add(1, 'day').toDate() },
    };
    const todayTasks = await getTasksByDate(todayData);

    console.log('\n***THESE ARE THE TODAY TASKS***');
    console.log(JSON.stringify(todayTasks));
    console.log('********************************\n');

    if (todayTasks && req.user_id) {
      addFocusEvents(todayTasks, moment(today), req.user_id);
    }

    if (todayTasks && !sortNewTasks(todayTasks)) {
      throw new Error('Failed to sort tasks');
    }

    res.status(200).json({
      message: 'Tasks updated successfully',
    });
  },
);
