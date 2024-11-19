'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    
    static associate(models) {
      productos.belongsTo(models.proveedores, { foreignKey: 'idProveedor', as: 'proveedor'})
      productos.hasMany(models.detalleCompras, { foreignKey: 'idProducto', as: 'detalleCompras'})
      productos.hasMany(models.detalleVentas, { foreignKey: 'idProducto', as: 'detalleVentas'})
    }

  }
  productos.init({
    nombreProducto: DataTypes.STRING,
    precioCompra: DataTypes.DECIMAL,
    precioVenta: DataTypes.DECIMAL,
    stockActual: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productos',
  });
  return productos;
};