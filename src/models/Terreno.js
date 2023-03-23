import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Manager from './Manager';

const Terreno = sequelize.define('terrain', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  current_crop: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

Terreno.belongsTo(Manager, { foreignKey: 'manager_id', as: 'manager'});
Manager.hasMany(Terreno);

export default Terreno;
