'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EZSP_T_PERMISSONS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EZSP_T_USERS',
          key: 'id'
        }
      },
      id_role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EZSP_T_ROLES',
          key: 'id'
        }
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
    await queryInterface.dropTable('EZSP_T_PERMISSONS');
  }
};