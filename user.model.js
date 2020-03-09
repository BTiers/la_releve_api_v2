import Sequelize, {
  DataTypes,
  Model,
} from 'sequelize';

import Database from './config/database';

import slugify from './utils/slugify';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  study_level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: Database,
  modelName: 'User',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

User.sync();

User.beforeCreate((user) => {
  // eslint-disable-next-line no-param-reassign
  user.slug = `${slugify(user.first_name)}-${slugify(user.last_name)}`;
});

User.beforeUpdate((user) => {
  if (user.changed('first_name') || user.changed('last_name')) {
    // eslint-disable-next-line no-param-reassign
    user.slug = `${slugify(user.first_name)}-${slugify(user.last_name)}`;
  }
});

// Sanitizing phone_number from response
User.prototype.toResponse = ({
  id,
  first_name,
  last_name,
  email,
  last_school,
  study_level,
  slug,
}) => ({
  id,
  first_name,
  last_name,
  email,
  last_school,
  study_level,
  slug,
});

export default User;
