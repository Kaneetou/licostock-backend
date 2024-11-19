'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {

    static associate(models) {
      roles.hasMany(models.usuarios, { foreignKey: 'idRol', as: 'usuarios'})
    }

  }
  roles.init({
    nombreRol: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};