import { Sequelize } from 'sequelize';
import userModel  from './user.js';
import taskModel  from './task.js';
import commentModel  from './comment.js';
import dbConfig from '../config/db.js';

const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
  host: dbConfig.development.host,
  dialect: dbConfig.development.dialect,
});

const models = {
    User : userModel(sequelize,Sequelize.DataTypes),
    Task : taskModel(sequelize,Sequelize.DataTypes),
    Comment : commentModel(sequelize,Sequelize.DataTypes)
};

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;

