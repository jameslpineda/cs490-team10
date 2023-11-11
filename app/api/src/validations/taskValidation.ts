import { TaskInterface } from '../interfaces/taskInterface';
import Joi from 'joi';

export const validateTask = (data: TaskInterface) => {
  const schema = Joi.object({
    status: Joi.string().valid(
      'Task has not been started',
      'Task is in progress',
      'Task is complete',
      'Task rolled over to the next day',
      'Task is deleted',
    ),
    notes: Joi.string().allow(''),
    priority: Joi.string().valid('Top Priority', 'Important', 'Other'),
    timers: Joi.number().min(0),
  });

  return schema.validate(data);
};
