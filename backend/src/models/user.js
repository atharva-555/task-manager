import {ROLES} from '../constants/roles.js';
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM(ROLES.USER, ROLES.ADMIN), allowNull: false, defaultValue: ROLES.USER },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW },
  }, {
    tableName: 'Users',
    indexes: [{ unique: true, fields: ['email'] }],
  });
  User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: 'createdBy', as: 'createdTasks' });
    User.hasMany(models.Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
  };
  return User;
};