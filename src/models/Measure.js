import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Terrain from './Terreno';

const Measures = sequelize.define('measures', {
  terrain_id: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    references: {
      model: Terrain,
      key: 'id'
    }
  },
  pH: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  soil_moisture: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  temperature: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  electroconductivity: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

Measures.belongsTo(Terrain);

export default Measures;
