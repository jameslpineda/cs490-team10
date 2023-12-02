import Joi from 'joi';
import { GetEventsReqBody } from '../interfaces/eventsInterface';

export const createTokensValidation = (data: GetEventsReqBody) => {
  const schema = Joi.object({
    code: Joi.string().required(),
  });

  return schema.validate(data);
};
