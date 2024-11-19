const detalleCompras = require('../models').detalleCompras
const {productos} = require('../models')


exports.tomarDetalles = async (req, res) => {
    try {
        const {cantidadCompra, idProducto, idCompra} = req.body;

        const producto = await productos.findByPk(idProducto);

        const nuevoDetalleCompra = await detalleCompras.create({
            cantidadCompra,
            idProducto,
            idCompra,
            precioUnitario : producto.precioCompra,
            
        })
        res.status(200).json({message: 'Detalles creados con éxito', nuevoDetalleCompra})
    } catch ( error ){
        console.error(error);
        res.status(500).json({message: 'Algo ha salido mal'})
    }
}

exports.listarDetalles = async (req, res) => {

    try {
        const detallesListados = await detalleCompras.findAll({});

        res.status(200).json({ detallesListados });

    } catch (error) {
        res.status(500).json({ message: "Algo ha salido mal listando los detalles", error })
    }

}

exports.eliminarDetalles = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await detalleCompras.destroy({
            where: { id }
        });

        if (detalle) {
            res.status(200).json({ message: 'Compra eliminada correctamente', detalle });
        } else {
            res.status(404).json({ message: 'Compra no encontrada' });
        }

    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el Proveedor', error });
    }
}