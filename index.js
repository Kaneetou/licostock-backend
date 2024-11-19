const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const productoRoutes = require('./routes/productoRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const rolRoutes = require('./routes/rolRoutes');
const detallecRoutes = require('./routes/detallecRoutes');
const detallevRoutes = require('./routes/detallevRoutes');
const compraRoutes = require('./routes/compraRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

const cors = require('cors');
// Uso del CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de usuario
app.use('/usuarios', usuarioRoutes);

app.use('/auth', authRoutes);

app.use('/productos', productoRoutes);

app.use('/proveedores', proveedorRoutes);

app.use('/roles', rolRoutes);

app.use('/detallesc', detallecRoutes);

app.use('/detallesv', detallevRoutes);

app.use('/compras', compraRoutes);

app.use('/ventas', ventaRoutes);

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});