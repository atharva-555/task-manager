export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false,validate:{  len: { args: [3, 255], msg: "Title must be between 3 and 255 characters" }} },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('open', 'in-progress', 'completed'), defaultValue: 'open' },
    dueDate: { type: DataTypes.DATE },
    createdBy: { type: DataTypes.INTEGER, allowNull: false ,validate:{isInt:{ msg: "CreatedBy must be an integer" }}},
    assignedTo: { type: DataTypes.INTEGER, allowNull: true, validate: {isInt: { msg: "AssignedTo must be an integer" }}},
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    recurrence: { type: DataTypes.ENUM('none', 'daily', 'weekly', 'monthly'), defaultValue: 'none' },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW }
  }, {
    tableName: 'Tasks',
    indexes: [
      { fields: ['createdBy'] },
      { fields: ['assignedTo'] },
      { fields: ['status'] },
      { fields: ['status', 'assignedTo', 'isDeleted'] }
    ]
  });
  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    Task.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignee' });
    Task.hasMany(models.Comment, { foreignKey: 'taskId'});
  };
  return Task;
};