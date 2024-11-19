const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController')

router.post('/crear', proveedorController.crearProveedor);

router.get('/listar', proveedorController.listarProveedores);

router.delete('/eliminar/:id', proveedorController.eliminarProveedor);

router.put('/editar/:id', proveedorController.editarProveedor);

module.exports = router;