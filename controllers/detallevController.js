const detalleVentas = require('../models').detalleVentas
const {productos} = require('../models')


exports.tomarDetalles = async (req, res) => {
    try {
        const {cantidadVenta, idProducto, idCompra} = req.body;

        const producto = await productos.findByPk(idProducto);

        const nuevoDetalleVenta = await detalleVentas.create({
            cantidadVenta,
            idProducto,
            idCompra,
            precioUnitario : producto.precioVenta,
            
        })
        res.status(200).json({message: 'Detalles creados con éxito', nuevoDetalleVenta})
    } catch ( error ){
        console.error(error);
        res.status(500).json({message: 'Algo ha salido mal'})
    }
}

exports.listarDetalles = async (req, res) => {

    try {
        const detallesListados = await detalleVentas.findAll({});

        res.status(200).json({ detallesListados });

    } catch (error) {
        res.status(500).json({ message: "Algo ha salido mal listando los detalles", error })
    }

}

exports.eliminarDetalles = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await detalleVentas.destroy({
            where: { id }
        });

        if (detalle) {
            res.status(200).json({ message: 'Venta eliminada correctamente', detalle });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }

    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el Proveedor', error });
    }
}