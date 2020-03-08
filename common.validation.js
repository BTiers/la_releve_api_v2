import Joi from '@hapi/joi';

const identifier = Joi.string()
  .uuid();

export { identifier };
