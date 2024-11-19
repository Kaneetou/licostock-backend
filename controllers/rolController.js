const roles = require('../models').roles;

exports.crearRol = async (req, res) => {
    const {nombreRol} = req.body;

    try {
        const rolExiste = await roles.findOne({where: {nombreRol}});
        if(rolExiste){
            return res.status(400).json({message: 'Este rol ya fue creado'});
        }
        const nuevoRol = await roles.create({
            nombreRol
        });
        res.status(201).json({message: 'Rol creado con éxito', roles:nuevoRol})
    } catch (error) {
        console.error('Error al crear el rol: ', error);
        res.status(500).json({message: 'Error al crear el rol'})
    }
}




