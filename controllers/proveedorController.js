const proveedores = require('../models').proveedores;

exports.crearProveedor = async (req, res) => {
    const {nombreProveedor, telefonoProveedor, emailProveedor} = req.body;

    try {
        const proveedorExiste = await proveedores.findOne({where: {nombreProveedor}});
        if(proveedorExiste){
            return res.status(400).json({message: 'Este proveedor ya fue creado'});
        }
        const nuevoProveedor = await proveedores.create({
            nombreProveedor,
            telefonoProveedor,
            emailProveedor
        });
        res.status(201).json({message: 'Proveedor creado con éxito', proveedores:nuevoProveedor})
    } catch (error) {
        console.error('Error al crear el proveedor: ', error);
        res.status(500).json({message: 'Error al crear el proveedor'})
    }
}
exports.editarProveedor = async (req, res) => {
    const {id} = req.params;
    const {nombreProveedor, telefonoProveedor, emailProveedor} = req.body;

    try {

        const proveedor = await proveedores.findByPk(id)
        if(!proveedor) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        await proveedor.update({
            nombreProveedor,
            telefonoProveedor,
            emailProveedor,
        });

        res.status(200).json({ message: "Proveedor actualizado exitosamente", proveedor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al editar el Proveedor", error: error.message });
    }
}
exports.listarProveedores = async (req, res) => {

    try {
        const proveedoresListados = await proveedores.findAll({});

        res.status(200).json({ proveedoresListados });

    } catch (error) {
        res.status(500).json({ message: "Algo ha salido mal", error })
    }

}
exports.eliminarProveedor = async (req, res) => {

    try {
        const { id } = req.params;
        const proveedorEliminado = await proveedores.destroy({
            where: { id }
        });

        if (proveedorEliminado) {
            res.status(200).json({ message: 'Proveedor eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Proveedor no encontrado' });
        }

    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el Proveedor', error });
    }

}