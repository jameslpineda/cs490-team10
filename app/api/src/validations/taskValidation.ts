import { TaskInterface } from '../interfaces/taskInterface';
import Joi from 'joi';

export const createTaskValidation = (data: TaskInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    notes: Joi.string().allow(''),
    status: Joi.string().allow(''),
    priority: Joi.string()
      .valid('Top Priority', 'Important', 'Other')
      .required(),
    timers: Joi.number().min(1).required(),
    completed_timers: Joi.number().min(0),
    date: Joi.date().required(),
  });

  return schema.validate(data);
};

export const updateTaskValidation = (data: TaskInterface) => {
  const schema = Joi.object({
    name: Joi.string(),
    status: Joi.string().valid(
      'Task has not been started',
      'Task is in progress',
      'Task is complete',
      'Task rolled over to the next day',
      'Task is deleted',
    ),
    completed_timers: Joi.number().min(0),
    timers: Joi.number().min(1),
    notes: Joi.string().allow(''),
    priority: Joi.string().valid('Top Priority', 'Important', 'Other'),
    date: Joi.date(),
  });

  return schema.validate(data);
};
