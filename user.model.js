import Sequelize, { DataTypes, Model } from 'sequelize';

import Database from './config/database.js';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
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
  },
  {
    sequelize: Database,
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

User.sync();

// Sanitizing phone_number from response
User.prototype.toResponse = ({ id, first_name, last_name, email, last_school, study_level }) => {
  return {
    id,
    first_name,
    last_name,
    email,
    last_school,
    study_level,
  };
};

export default User;
