'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('Comments', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        taskId: { type: Sequelize.INTEGER, allowNull: false },
        userId: { type: Sequelize.INTEGER, allowNull: false },
        text: { type: Sequelize.TEXT, allowNull: false },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('Comments');
  }
};
