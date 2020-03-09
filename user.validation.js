import Joi from '@hapi/joi';

import { identifier } from './common.validation';
import APIError from './APIError';

class UserValidation {
  static async getOne(req, _, next) {
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

  static async getAll(_, __, next) {
    next();
  }

  static async post(req, _, next) {
    const postSchema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string().required(),
      last_school: Joi.string().required(),
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

  static async put(req, _, next) {
    const putSchema = Joi.object({
      first_name: Joi.string()
        .required(),
      last_name: Joi.string()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string().required(),
      last_school: Joi.string()
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

  static async patch(req, _, next) {
    const patchSchema = Joi.object({
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      last_school: Joi.string(),
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

  static async delete(req, _, next) {
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
