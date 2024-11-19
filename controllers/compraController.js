const {compras} = require('../models')
const  {detalleCompras} = require('../models')

exports.crearCompra = async (req, res) => {
    try {

       const detalles = req.body.detalleCompras;
       
       if(!Array.isArray(detalles) || detalles.length === 0) {
        return res.status(400).json({error: 'No es un array'})
       }

       let totalCompras = 0;

       for(let detalle of detalles) {
        totalCompras += detalle.cantidadCompra * detalle.precioUnitario;
       }

       const nuevaCompra = await compras.create({
        fechaCompra: new Date(),
        totalCompra: totalCompras
       });

       for(let detalle of detalles) {
        await detalleCompras.create({
            idCompra: nuevaCompra.id,
            idProducto: detalle.idProducto,
            cantidadCompra: detalle.cantidadCompra,
            precioUnitario: detalle.precioUnitario
        })
       }

       res.status(201).json({message: 'Compra creada exitosamente', compra: nuevaCompra})

    } catch (error){
        console.error(error)
        res.status(500).json({message: 'Algo ha salido mal', error})
    }
}

exports.listarCompras = async (req, res) => {

    try {
        const comprasListadas = await compras.findAll({});

        res.status(200).json({ comprasListadas });

    } catch (error) {
        res.status(500).json({ message: "Algo ha salido mal listando las compras", error })
    }

}

exports.eliminarCompras = async (req, res) => {
    try {
        const { id } = req.params;
        const compra = await compras.destroy({
            where: { id }
        });

        if (compra) {
            res.status(200).json({ message: 'Compra eliminada correctamente', compra });
        } else {
            res.status(404).json({ message: 'Compra no encontrada' });
        }

    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el Proveedor', error });
    }
}