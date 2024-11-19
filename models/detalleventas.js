'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleVentas extends Model {
    
    static associate(models) {
    detalleVentas.belongsTo(models.productos, { foreignKey: 'idProducto', as: 'productos'})
    detalleVentas.belongsTo(models.ventas, { foreignKey: 'idVenta', as: 'ventas'})
    }
    
  }
  detalleVentas.init({
    cantidadVenta: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'detalleVentas',
  });
  return detalleVentas;
};