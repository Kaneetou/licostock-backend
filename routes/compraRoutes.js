const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.post('/crear', compraController.crearCompra);

router.get('/listar', compraController.listarCompras);

router.delete('/eliminar/:id', compraController.eliminarCompras);

module.exports = router;