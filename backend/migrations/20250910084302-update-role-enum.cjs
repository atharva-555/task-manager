'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // For MySQL
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('User', 'Admin'),
      allowNull: false,
      defaultValue: 'User',
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback to old ENUM
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('User', 'Admin'),
      allowNull: false,
      defaultValue: 'user',
    });
  },
};
