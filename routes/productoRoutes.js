const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController')

router.post('/crear', productoController.crearProducto);

router.get('/listar', productoController.listarProductos);

router.delete('/eliminar/:id', productoController.eliminarProducto);

router.put('/editar/:id', productoController.editarProducto);

module.exports = router;

