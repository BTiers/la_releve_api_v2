import Joi from '@hapi/joi';

const identifier = Joi.string().uuid();

// eslint-disable-next-line import/prefer-default-export
export { identifier };
