import { TaskInterface } from '../interfaces/taskInterface';
import Joi from 'joi';

export const validateTask = (data: TaskInterface) => {
  const schema = Joi.object({
    status: Joi.string().valid(
      'Task Has Not Started',
      'Task In Progress',
      'Task Is Complete',
      'Task Rollover',
      'Task Is Deleted',
    ),
    notes: Joi.string().allow(''),
    priority: Joi.string().valid('Top Priority', 'Important', 'Other'),
    timers: Joi.number().min(0),
  });

  return schema.validate(data);
};
