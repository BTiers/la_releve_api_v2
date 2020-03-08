import UserModel from './user.model.js';
import APIError from './APIError.js';

class UserDAL {
  constructor() {
    if (!!UserDAL.instance) {
      return UserDAL.instance;
    }

    UserDAL.instance = this;
    return this;
  }

  async getOne(id) {
    const user = await UserModel.findByPk(id);

    if (!user)
      throw new APIError(
        {
          name: 'user_not_found',
          httpCode: 404,
          details: [`User with id ${id} cannot be found`],
        },
        true
      );
    return user.toResponse(user);
  }

  async getAll() {
    const users = await UserModel.findAll();

    return users.map(user => user.toResponse(user));
  }

  async create(properties) {
    const user = await UserModel.create({ ...properties });

    return user.toResponse(user);
  }

  async update(id, properties) {
    const user = await UserModel.findByPk(id);

    if (!user)
      throw new APIError(
        {
          name: 'user_not_found',
          httpCode: 404,
          details: [`User with id ${id} cannot be found and therefore wasn't updated`],
        },
        true
      );

    Object.entries(properties).forEach(([key, value]) => {
      user[key] = value;
    });

    await user.save();
  }

  async delete(id) {
    const user = await UserModel.findByPk(id);

    if (!user)
      throw new APIError(
        {
          name: 'user_not_found',
          httpCode: 404,
          details: [`User with id ${id} cannot be found and therefore wasn't deleted`],
        },
        true
      );
    await user.destroy();
  }
}

export default UserDAL;
