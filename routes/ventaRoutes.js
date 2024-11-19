const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.post('/crear', ventaController.crearVenta);

router.get('/listar', ventaController.listarVentas);

router.delete('/eliminar/:id', ventaController.eliminarVentas);

module.exports = router;