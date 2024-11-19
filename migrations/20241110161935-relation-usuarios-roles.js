'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'usuarios',
      'idRol', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )
  },

  async down (queryInterface, Sequelize) {
    const confirmarColumna = await queryInterface.decribeTable('usuarios');
    if(confirmarColumna.idRol){
      await queryInterface.removeColumn('usuarios', 'idRol');
    }
  }
};
