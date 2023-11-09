import { ObjectId } from 'mongodb';
import { TaskInterface } from '../interfaces/taskInterface';
import Joi from 'joi';

export const validateTaskStatusUpdate = (data: {
  _id: ObjectId;
  status: string;
}) => {
  const schema = Joi.object({
    status: Joi.string()
      .valid('not complete', 'in progress', 'complete', 'rollover', 'delete')
      .required(),
  });

  return schema.validate(data);
};
