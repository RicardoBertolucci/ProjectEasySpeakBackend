'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EZSP_T_ROLES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ds_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dt_created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dt_updated: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EZSP_T_ROLES');
  }
};