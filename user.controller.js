import UserDAL from './user.dal.js';

class UserController {
  constructor() {
    if (!!UserController.instance) return UserController.instance;

    this._DAL = new UserDAL();

    this.getOne = this.getOne.bind(this);
    this.getAll = this.getAll.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);

    UserController.instance = this;
    return this;
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const user = await this._DAL.getOne(id);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async getAll(_, res, next) {
    try {
      const users = await this._DAL.getAll();

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async post(req, res, next) {
    const { body } = req;

    try {
      const user = await this._DAL.create(body);

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async put(req, res, next) {
    const { id } = req.params;
    const { body } = req;

    try {
      await this._DAL.update(id, body);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  async patch(req, res, next) {
    const { id } = req.params;
    const { body } = req;

    try {
      await this._DAL.update(id, body);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await this._DAL.delete(id);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
