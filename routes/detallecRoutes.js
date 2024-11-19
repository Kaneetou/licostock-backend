const express = require('express');
const router = express.Router();
const detallecController = require('../controllers/detallecController');

router.post('/crear', detallecController.tomarDetalles);

router.get('/listar', detallecController.listarDetalles);

router.delete('/eliminar/:id', detallecController.eliminarDetalles);

module.exports = router;