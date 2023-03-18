import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Manager = sequelize.define('managers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  fullname: {
    type: Sequelize.TEXT,
    allowNull: false
  },
}, {});

export default Manager;