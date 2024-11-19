'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleCompras extends Model {
    
    static associate(models) {
      detalleCompras.belongsTo(models.productos, { foreignKey: 'idProducto', as: 'productos'})
      detalleCompras.belongsTo(models.compras, { foreignKey: 'idCompra', as: 'compras'})
    }

  }
  detalleCompras.init({
    cantidadCompra: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'detalleCompras',
  });
  return detalleCompras;
};