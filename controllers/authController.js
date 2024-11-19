const jwt = require('jsonwebtoken');
const secretKey = 'llave_secreta_jwt';
const bcrypt = require('bcryptjs');
const {usuarios} = require('../models');

const generarTokenJWT = (usuarios) => {
    const payload = {
        id: usuarios.id,
        nombre: usuarios.nombre,
        correo: usuarios.correo,
        rolId: usuarios.rolId
    }

    return jwt.sign(payload, secretKey, {
        expiresIn: '1h'
    });
};

exports.login = async (req, res) => {
  const { emailUsuario, contraseñaUsuario } = req.body;


  try {
  // Verificar si el usuario existe
  const usuarioExistente = await usuarios.findOne({ where: { emailUsuario } });

  if (!usuarioExistente) {
    
    return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    
  }

  // Comparar las contraseñas
  const esContraseñaValida = await bcrypt.compare(contraseñaUsuario, usuarioExistente.contraseñaUsuario);
  if (!esContraseñaValida) {
    return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
  }

  // Generar el token JWT
  const token = generarTokenJWT(usuarioExistente);

  return res.json({ 
    success: true,
    token,
    usuario: {nombreUsuario: usuarioExistente.nombreUsuario, emailUsuario: usuarioExistente.emailUsuario, roleUsuario: usuarioExistente.idRol}
   });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Error en el servidor", 
      error: error.message 
    });
  }
};
