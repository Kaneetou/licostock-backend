const {ventas} = require('../models')
const  {detalleVentas} = require('../models')

exports.crearVenta = async (req, res) => {
    try {

       const detalles = req.body.detalleVentas;
       
       if(!Array.isArray(detalles) || detalles.length === 0) {
        return res.status(400).json({error: 'No es un array'})
       }

       let totalVentas = 0;

       for(let detalle of detalles) {
        totalVentas += detalle.cantidadVenta * detalle.precioUnitario;
       }

       const nuevaVenta = await ventas.create({
        fechaVenta: new Date(),
        totalVenta: totalVentas
       });

       for(let detalle of detalles) {
        await detalleVentas.create({
            idVenta: nuevaVenta.id,
            idProducto: detalle.idProducto,
            cantidadVenta: detalle.cantidadVenta,
            precioUnitario: detalle.precioUnitario
        })
       }

       res.status(201).json({message: 'Venta creada exitosamente', venta: nuevaVenta})

    } catch (error){
        console.error(error)
        res.status(500).json({message: 'Algo ha salido mal', error})
    }
}

exports.listarVentas = async (req, res) => {

    try {
        const ventasListadas = await ventas.findAll({});

        res.status(200).json({ ventasListadas });

    } catch (error) {
        res.status(500).json({ message: "Algo ha salido mal listando las ventas", error })
    }

}

exports.eliminarVentas = async (req, res) => {
    try {
        const { id } = req.params;
        const venta = await ventas.destroy({
            where: { id }
        });

        if (venta) {
            res.status(200).json({ message: 'venta eliminada correctamente', venta });
        } else {
            res.status(404).json({ message: 'venta no encontrada' });
        }

    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el Proveedor', error });
    }
}