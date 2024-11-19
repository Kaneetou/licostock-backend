'use strict';
const {
  Model,
  INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    
    static associate(models) {
      usuarios.belongsTo(models.roles, { foreignKey: 'idRol', as: 'roles'});
    }
  }
  usuarios.init({
    nombreUsuario: DataTypes.STRING,
    emailUsuario: {
      type: DataTypes.STRING,
      unique: true
    },
    contraseñaUsuario: DataTypes.STRING,
    telefonoUsuario: DataTypes.STRING,
    estadoUsuario: {
      type: DataTypes.BOOLEAN,
      defaultValude: true
    },
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};