import Joi from 'joi';

export const forgotPasswordValidation = (data: { email: string }) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.base': 'Email should be a type of String',
            'string.empty': 'Email cannot be an empty field',
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required',
        }),
    });
    return schema.validate(data);
};
