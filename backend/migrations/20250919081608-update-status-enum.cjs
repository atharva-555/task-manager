'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // For MySQL
    await queryInterface.changeColumn('Tasks', 'status', {
      type: Sequelize.ENUM('open', 'in-progress', 'completed', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback to old ENUM
    await queryInterface.changeColumn('Tasks', 'status', {
      type: Sequelize.ENUM('open', 'in-progress', 'completed'),
      allowNull: false,
      defaultValue: 'open',
    });
  },
};
