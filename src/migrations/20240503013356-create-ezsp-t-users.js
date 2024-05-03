'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EZSP_T_USERS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ds_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ds_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nr_crm: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('EZSP_T_USERS');
  }
};