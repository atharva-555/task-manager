'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('Tasks', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING(255), allowNull: false },
        description: { type: Sequelize.TEXT },
        status: { type: Sequelize.ENUM('open', 'in-progress', 'completed'), defaultValue: 'open' },
        dueDate: { type: Sequelize.DATE },
        createdBy: { type: Sequelize.INTEGER, allowNull: false },
        assignedTo: { type: Sequelize.INTEGER, allowNull: true },
        isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false },
        recurrence: { type: Sequelize.ENUM('none', 'daily', 'weekly', 'monthly'), defaultValue: 'none' },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('Tasks');
  }
};
