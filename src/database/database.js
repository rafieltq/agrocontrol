import Sequelize from 'sequelize';
import dotenv from 'dotenv';
// Load env file
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      required: 30000,
      idle: 10000
    },
    logging: false,
    define: {
      underscored: true,
      timestamps: true
    }
  }
);

sequelize.sync({ force: (process.env.FORCE_SYNC == 'true') })
  .then(() => {
    console.log('Database connected');
  }).then(async () => {
    if (process.env.CREATE_DUMMY_DATA === 'true') {
      const createDummyData = require('./dummyData/index').default;
      await createDummyData();
    }
  });

export default { sequelize };