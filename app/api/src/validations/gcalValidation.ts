import Joi from 'joi';
import { CreateTokensReqBody } from '../interfaces/gcalInterface';

export const createTokensValidation = (data: CreateTokensReqBody) => {
  const schema = Joi.object({
    code: Joi.string().required(),
  });

  return schema.validate(data);
};
