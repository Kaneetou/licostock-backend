const productos = require('../models').productos;

exports.crearProducto = async (req, res) => {

    const {nombreProducto, precioCompra, precioVenta, stockActual, idProveedor} = req.body;

    try {
        const productoExiste = await productos.findOne({where: {nombreProducto}});
        if(productoExiste){
            return res.status(400).json({message: 'Este producto ya fue creado'});
        }
        const nuevoProducto = await productos.create({
            nombreProducto,
            precioCompra,
            precioVenta,
            stockActual, 
            idProveedor
        });
        res.status(201).json({message: 'Producto creado con éxito', productos:nuevoProducto})
    } catch (error) {
        console.error('Error al crear el producto: ', error);
        res.status(500).json({message: 'Error al crear el producto'})
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await productos.destroy({
            where: { id }
        });

        if (productoEliminado) {
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }

    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
}

exports.listarProductos = async (req, res) => {

    try {
        const productosListados = await productos.findAll({});

        res.status(200).json({ productosListados });

    } catch (error) {
        res.status(500).json({ message: "Algo ha salido mal", error })
    }

}

exports.editarProducto = async (req, res) => {
    
    const {id} = req.params;
    const {nombreProducto, precioCompra, precioVenta, stockActual, idProveedor} = req.body;

    try {

        const producto = await productos.findByPk(id)
        if(!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await producto.update({
            nombreProducto,
            precioCompra,
            precioVenta,
            stockActual,
            idProveedor
        });

        res.status(200).json({ message: "Producto actualizado exitosamente", producto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al editar el producto", error: error.message });
    }
    
}