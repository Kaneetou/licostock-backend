const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController')

router.post('/crear', rolController.crearRol);

module.exports = router;