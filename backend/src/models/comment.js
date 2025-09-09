export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'Comments',
    indexes: [
      { fields: ['taskId'] },
      { fields: ['userId'] }
    ]
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Task, { foreignKey: 'taskId', onDelete: 'CASCADE' });
  };
  return Comment;
};