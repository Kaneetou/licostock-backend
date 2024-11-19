'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proveedores extends Model {
    
    static associate(models) {
      proveedores.hasMany(models.productos, { foreignKey: 'idProveedor', as: 'productos' })
    }
    
  }
  proveedores.init({
    nombreProveedor: DataTypes.STRING,
    telefonoProveedor: DataTypes.STRING,
    emailProveedor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'proveedores',
  });
  return proveedores;
};