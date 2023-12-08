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

// @desc Creates new planned task list for next day
// @route POST /task/plan
// @access Private
export const planTaskHandler = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const date = req.query.date;

    if (!date) {
      res.status(422).json({ error: 'Missing date in query' });
      return;
    }

    const from = moment(date as string)
      .subtract(1, 'days')
      .startOf('day');
    const to = moment(from).add(1, 'day');

    const today = moment(date as string)
      .startOf('day')
      .toDate();

    // Get all tasks by date
    const data = {
      user_id: req.user_id,
      date: { $gte: from.toDate(), $lt: to.toDate() },
    };
    const tasksToUpdate = await getTasksByDate(data);

    // Adjust here for empty task list retrieved
    if (!tasksToUpdate || tasksToUpdate.length === 0) {
      console.log('No tasks for planning');
      res.status(200).json({
        message: 'No tasks for planning',
        updatedTasks: 0,
        createdTasks: 0,
      });
      return;
    }

    const updatedTasks = await Promise.all(
      tasksToUpdate.map(async (task) => {
        try {
          // Make a service to filter out completed and cancelled tasks
          if (
            task.status !== 'Task is complete' &&
            task.status !== 'Task is deleted'
          ) {
            await updateTask(
              { _id: task._id, status: 'Task has not been started' },
              { status: 'Task rolled over to the next day' },
            );
          }
          return true;
        } catch (error) {
          console.error('Error updating task:', error);
          return false;
        }
      }),
    );

    const newTasks = tasksToUpdate.map((task) => ({
      user_id: task.user_id,
      notes: task.notes,
      name: task.name,
      timers: task.timers,
      completed_timers: task.completed_timers,
      // Change priority here
      priority: task.priority,
      status: 'Task has not been started',
      date: today,
    }));

    console.log(newTasks);

    const createdTasks = [];

    for (const newTaskData of newTasks) {
      try {
        console.log(newTaskData);
        const createdTask = await createTask(newTaskData);
        if (createdTask) {
          createdTasks.push(createdTask);
          console.log('Task created successfully:', createdTask);
        } else {
          console.error('Failed to create task. createTask returned null.');
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }

    if (
      !updatedTasks.every(Boolean) ||
      createdTasks.length !== newTasks.length
    ) {
      throw new Error('Failed to update tasks');
    }

    res.status(200).json({
      message: 'Tasks updated successfully',
      updatedTasks: updatedTasks.length,
      createdTasks: createdTasks.length,
    });
  } catch (error) {
    console.error('Error in planTaskHandler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
