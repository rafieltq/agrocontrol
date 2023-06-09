import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Manager = sequelize.define('manager', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});

export default Manager;
