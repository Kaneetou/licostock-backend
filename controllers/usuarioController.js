const bcrypt = require('bcryptjs'); // para encriptar la contraseña
const usuarios = require('../models').usuarios;

exports.crearUsuario = async (req, res) => {

    const { nombreUsuario, emailUsuario, contraseñaUsuario, telefonoUsuario, estadoUsuario, idRol } = req.body;

    try {
        // Verificar si el usuario ya existe
        const usuarioExiste = await usuarios.findOne({ where: { emailUsuario } });
        if (usuarioExiste) {
            return res.status(400).json({ message: 'Este correo ya está registrado.' });
        }

        // Encriptar la contraseña
        const contraseñaEncriptada = await bcrypt.hash(contraseñaUsuario, 10)
        // Crear el nuevo usuario

        const nuevoUsuario = await usuarios.create({
            nombreUsuario,
            emailUsuario,
            contraseñaUsuario: contraseñaEncriptada,
            telefonoUsuario,
            estadoUsuario,
            idRol
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', usuarios: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

exports.listarUsuarios = async (req, res) => {
    try {
        const usuario = await usuarios.findAll();
  
        res.status(200).json({ usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
}

exports.eliminarUsuario = async (req, res) => {

    try {
        const { id } = req.params;
        const usuarioEliminado = await usuarios.destroy({
            where: { id }
        });

        if (usuarioEliminado) {
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }

    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }

}