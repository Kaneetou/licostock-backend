const express = require('express');
const router = express.Router();
const detallevController = require('../controllers/detallevController');

router.post('/crear', detallevController.tomarDetalles);

router.get('/listar', detallevController.listarDetalles);

router.delete('/eliminar/:id', detallevController.eliminarDetalles);

module.exports = router;