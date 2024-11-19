'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compras extends Model {

    static associate(models) {
      compras.hasMany(models.detalleCompras, { foreignKey: 'idCompra', as: 'detalleCompras'})
    }

  }
  compras.init({
    fechaCompra: DataTypes.DATE,
    totalCompra: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'compras',
  });
  return compras;
};