'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.addColumn(
        'detalleCompras',
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
        'detalleCompras',
        'idCompra',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'compras',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true
        }
      );

  },

  async down (queryInterface, Sequelize) {

    const confirmarCompras = await queryInterface.describeTable('detalleCompras');
    if (confirmarCompras.idCompra){
      await queryInterface.removeColumn('detalleCompras', 'idCompra')
    }

    const confirmarProductos = await queryInterface.describeTable('detalleCompras');
    if (confirmarProductos.idProducto){
      await queryInterface.removeColumn('detalleCompras', 'idProducto')
    }
    
  }
};
