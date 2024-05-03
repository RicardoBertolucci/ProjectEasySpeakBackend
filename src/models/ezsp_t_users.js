'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EZSP_T_USERS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EZSP_T_USERS.init({
    ds_email: DataTypes.STRING,
    ds_password: DataTypes.STRING,
    nr_crm: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EZSP_T_USERS',
    tableName: "EZSP_T_USERS",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return EZSP_T_USERS;
};