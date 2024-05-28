"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EZSP_T_CONSULTATIONS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_patient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "EZSP_T_USERS",
          key: "id",
        },
      },
      id_fono: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "EZSP_T_USERS",
          key: "id",
        },
      },
      dt_consult: {
        type: Sequelize.DATE,
      },
      hr_consult: {
        type: Sequelize.INTEGER,
      },
      dt_created: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dt_updated: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EZSP_T_CONSULTATIONS");
  },
};
