'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'productos',
      'idProveedor',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'proveedores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )
  },

  async down (queryInterface, Sequelize) {
    const confirmarColumna = await queryInterface.describeTable('productos');
    if(confirmarColumna.idProveedor){
      await queryInterface.removeColumn('productos', 'idProveedor');
    }
  }
};
