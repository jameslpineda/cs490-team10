import Joi from 'joi';

export const signUpValidation = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$`,
        ),
      )
      .required()
      .messages({
        'string.pattern.base':
          'Password must have at least one lowercase and uppercase letter, one digit, one special char, and minimum 12 chars.',
      }),
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
