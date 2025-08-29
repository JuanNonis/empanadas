// index.js
// Archivo principal del backend de Pizzas y Empanadas
// Configura el servidor, middlewares, rutas y lógica de registro de usuario

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en peticiones (por ejemplo, desde Postman o fetch)
app.use(express.json());
// Middleware para parsear datos de formularios HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true })); // Necesario para recibir datos de formularios

// Importar rutas de módulos separados
const mainRoutes = require('./routes/main'); // Rutas de la página principal
const userRoutes = require('./routes/user'); // Rutas de usuario (login, pedidos, etc.)
const adminRoutes = require('./routes/admin'); // Rutas de administración

// Uso de rutas principales
app.use('/', mainRoutes); // Página principal y menú
app.use('/usuario', userRoutes); // Endpoints de usuario
app.use('/admin', adminRoutes); // Endpoints de administración

// Configuración de EJS como motor de vistas y carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Servir archivos estáticos (imágenes, CSS, JS)
app.use(express.static(__dirname + '/public'));

// Configuración adicional del servidor

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}); 