'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'detalleVentas',
      'idProducto',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'detalleVentas',
      'idVenta',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ventas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    );

  },

  async down (queryInterface, Sequelize) {
    
    const confirmarVentas = await queryInterface.describeTable('detalleVentas');
    if (confirmarVentas.idVenta){
      await queryInterface.removeColumn('detalleVentas', 'idVenta')
    }

    const confirmarProductos = await queryInterface.describeTable('detalleVentas');
    if (confirmarProductos.idProducto){
      await queryInterface.removeColumn('detalleVentas', 'idProducto')
    }
    
  }
};
