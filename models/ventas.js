'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    
    static associate(models) {
      ventas.hasMany(models.detalleVentas, { foreignKey: 'idVenta', as: 'detalleVentas'})
    }

  }
  ventas.init({
    fechaVenta: DataTypes.DATE,
    totalVenta: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return ventas;
};