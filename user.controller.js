import UserDAL from './user.dal';

class UserController {
  constructor() {
    if (UserController.instance) return UserController.instance;

    UserController.instance = this;
    return this;
  }

  static async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const user = await UserDAL.getOne(id);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(_, res, next) {
    try {
      const users = await UserDAL.getAll();

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async post(req, res, next) {
    const { body } = req;

    try {
      const user = await UserDAL.create(body);

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async put(req, res, next) {
    const { id } = req.params;
    const { body } = req;

    try {
      await UserDAL.update(id, body);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  static async patch(req, res, next) {
    const { id } = req.params;
    const { body } = req;

    try {
      await UserDAL.update(id, body);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;

    try {
      await UserDAL.delete(id);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
