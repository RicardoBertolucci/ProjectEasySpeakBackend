'use strict';
const {
  Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class EZSP_T_PERMISSIONS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EZSP_T_PERMISSIONS.belongsTo(models.EZSP_T_ROLES, {foreignKey: 'id_role'})
      EZSP_T_PERMISSIONS.belongsTo(models.EZSP_T_USERS, {foreignKey: 'id_user'})
    }
  }
  EZSP_T_PERMISSIONS.init({
  }, {
    sequelize,
    modelName: 'EZSP_T_PERMISSIONS',
    tableName: "EZSP_T_PERMISSIONS",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return EZSP_T_PERMISSIONS;
};