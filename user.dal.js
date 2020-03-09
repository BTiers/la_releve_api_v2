import UserModel from './user.model';
import APIError from './APIError';

class UserDAL {
  constructor() {
    if (UserDAL.instance) {
      return UserDAL.instance;
    }

    UserDAL.instance = this;
    return this;
  }

  static async getOne(id) {
    const user = await UserModel.findByPk(id);

    if (!user) {
      throw new APIError(
        {
          name: 'user_not_found',
          httpCode: 404,
          details: [`User with id ${id} cannot be found`],
        },
        true,
      );
    }
    return user.toResponse(user);
  }

  static async getAll() {
    const users = await UserModel.findAll();

    return users.map((user) => user.toResponse(user));
  }

  static async create(properties) {
    const user = await UserModel.create({ ...properties });

    return user.toResponse(user);
  }

  static async update(id, properties) {
    const user = await UserModel.findByPk(id);

    if (!user) {
      throw new APIError(
        {
          name: 'user_not_found',
          httpCode: 404,
          details: [`User with id ${id} cannot be found and therefore wasn't updated`],
        },
        true,
      );
    }

    Object.entries(properties).forEach(([key, value]) => {
      user[key] = value;
    });

    await user.save();
  }

  static async delete(id) {
    const user = await UserModel.findByPk(id);

    if (!user) {
      throw new APIError(
        {
          name: 'user_not_found',
          httpCode: 404,
          details: [`User with id ${id} cannot be found and therefore wasn't deleted`],
        },
        true,
      );
    }
    await user.destroy();
  }
}

export default UserDAL;
