export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    parentId:{type:DataTypes.INTEGER,allowNull:true},
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'Comments',
    indexes: [
      { fields: ['taskId'] },
      { fields: ['userId'] }
    ]
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Task, { foreignKey: 'taskId' });
    Comment.belongsTo(models.Comment,{foreignKey:'parentId'});
    Comment.hasMany(models.Comment,{foreignKey:'parentId' ,as:'replies'});
  };
  return Comment;
  
};