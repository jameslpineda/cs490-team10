import Joi from 'joi';

export const resetPasswordValidation = (data: {
  id: string;
  token: string;
  password: string;
}) => {
  const schema = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.base': 'ID should be a type of String',
        'string.pattern.base': 'ID should be a valid ObjectId',
        'string.empty': 'ID cannot be an empty field',
        'any.required': 'ID is required',
      }),
    token: Joi.string().required().messages({
      'string.base': 'Token should be a type of String',
      'string.empty': 'Token cannot be an empty field',
      'any.required': 'Token is required',
    }),
    password: Joi.string()
      .min(12)
      .custom((value, helpers) => {
        const typesCount = [
          /[a-z]/, // Lowercase
          /[A-Z]/, // Uppercase
          /\d/, // Numeric
          /[^a-zA-Z\d]/, // Special characters
        ].reduce((count, pattern) => count + (pattern.test(value) ? 1 : 0), 0);

        if (typesCount < 2) {
          return helpers.message({
            custom:
              'Password must contain characters from at least two of the specified types: uppercase, lowercase, numeric, and special characters',
          });
        }
        return value;
      })
      .custom((value, helpers) => {
        if (value.includes(' ')) {
          return helpers.message({ custom: 'Password cannot contain spaces' });
        }
        return value;
      })
      .required()
      .messages({
        'string.base': 'Password should be a type of String',
        'string.min': 'Password must be at least 12 characters long',
        'string.empty': 'Password cannot be an empty field',
        'any.required': 'Password is required',
      }),
  });
  return schema.validate(data);
};
