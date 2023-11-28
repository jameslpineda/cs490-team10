import { UserInterface } from '../interfaces/userInterface';
import Joi from 'joi';

export const signUpValidation = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

export const signInValidation = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

export const updateUserValidation = (data: UserInterface) => {
  const schema = Joi.object({
    first_name: Joi.string().allow(''),
    last_name: Joi.string().allow(''),
    current_password: Joi.string().min(1),
    new_password: Joi.when('current_password', {
      is: Joi.exist(),
      then: Joi.string().required(),
      otherwise: Joi.string(),
    }),
    pomodoro: Joi.number().integer().min(1).max(60),
    short_break: Joi.number().integer().min(1).max(60),
    long_break: Joi.number().integer().min(1).max(60),
  });

  return schema.validate(data);
};

export const forgotPasswordValidation = (data: { email: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

export const resetPasswordValidation = (data: {
  _id: string;
  token: string;
  password: string;
}) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    token: Joi.string().required(),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          `^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$`,
        ),
      )
      .messages({
        'string.pattern.base':
          'Password must have at least one lowercase and uppercase letter, one digit, one special char, and minimum 12 chars.',
      }),
  });
  return schema.validate(data);
};
