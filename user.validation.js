import Joi from '@hapi/joi';

import { identifier } from './common.validation.js';
import APIError from './APIError.js';

class UserValidation {
  constructor() {
    if (!!UserValidation.instance) {
      return UserValidation.instance;
    }

    UserValidation.instance = this;
    return this;
  }

  async getOne(req, _, next) {
    const { id } = req.params;

    try {
      await identifier.validateAsync(id);

      next();
    } catch (err) {
      const apiErr = new APIError();

      apiErr.fromJoi(err);
      next(apiErr);
    }
  }

  async getAll(_, __, next) {
    next();
  }

  async post(req, _, next) {
    const postSchema = Joi.object({
      first_name: Joi.string()
        .alphanum()
        .required(),
      last_name: Joi.string()
        .alphanum()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string().required(),
      last_school: Joi.string()
        .alphanum()
        .required(),
      study_level: Joi.string().required(),
    }).options({ abortEarly: false });

    const { body } = req;

    try {
      await postSchema.validateAsync(body);
      next();
    } catch (err) {
      const apiErr = new APIError();

      apiErr.fromJoi(err);
      next(apiErr);
    }
  }

  async put(req, _, next) {
    const putSchema = Joi.object({
      first_name: Joi.string()
        .alphanum()
        .required(),
      last_name: Joi.string()
        .alphanum()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string().required(),
      last_school: Joi.string()
        .alphanum()
        .required(),
      study_level: Joi.string().required(),
    }).options({ abortEarly: false });

    const { id } = req.params;
    const { body } = req;

    try {
      await identifier.validateAsync(id);
      await putSchema.validateAsync(body);
      next();
    } catch (err) {
      const apiErr = new APIError();

      apiErr.fromJoi(err);
      next(apiErr);
    }
  }

  async patch(req, _, next) {
    const patchSchema = Joi.object({
      first_name: Joi.string().alphanum(),
      last_name: Joi.string().alphanum(),
      email: Joi.string().email(),
      phone: Joi.string(),
      last_school: Joi.string().alphanum(),
      study_level: Joi.string(),
    }).or('first_name', 'last_name', 'email', 'phone', 'last_school', 'study_level');

    const { id } = req.params;
    const { body } = req;

    try {
      await identifier.validateAsync(id);
      await patchSchema.validateAsync(body);
      next();
    } catch (err) {
      const apiErr = new APIError();

      apiErr.fromJoi(err);
      next(apiErr);
    }
  }

  async delete(req, _, next) {
    const { id } = req.params;

    try {
      await identifier.validateAsync(id);
      next();
    } catch (err) {
      const apiErr = new APIError();

      apiErr.fromJoi(err);
      next(apiErr);
    }
  }
}

export default UserValidation;
