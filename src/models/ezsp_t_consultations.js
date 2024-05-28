'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EZSP_T_CONSULTATIONS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EZSP_T_CONSULTATIONS.belongsTo(models.EZSP_T_USERS, {foreignKey: 'id_patient'})
      EZSP_T_CONSULTATIONS.belongsTo(models.EZSP_T_USERS, {foreignKey: 'id_fono'})
    }
  }
  EZSP_T_CONSULTATIONS.init({
    dt_consult: DataTypes.DATE,
    hr_consult: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EZSP_T_CONSULTATIONS',
    tableName: "EZSP_T_CONSULTATIONS",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return EZSP_T_CONSULTATIONS;
};