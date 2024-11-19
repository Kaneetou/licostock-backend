const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controllers/usuarioController');
const verificarTokenJWT = require('../middleware/authMiddleware');

// Ruta para registrar un nuevo usuario
router.post('/crear', usuarioControlador.crearUsuario);

router.get('/listar', usuarioControlador.listarUsuarios);

router.delete('/eliminar/:id', usuarioControlador.eliminarUsuario)

module.exports = router;