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

// --- Registro de usuario desde el frontend ---
/**
 * GET /usuario/register
 * Muestra el formulario de registro de usuario (frontend)
 * Renderiza la vista register.ejs con posibles mensajes de error o éxito
 */
app.get('/usuario/register', (req, res) => {
  res.render('register', { error: null, success: null });
});

/**
 * POST /usuario/register
 * Procesa el formulario de registro de usuario
 * - Valida que nombre, email y contraseña estén presentes
 * - Encripta la contraseña con bcrypt
 * - Inserta el usuario en la base de datos
 * - Si el email ya existe, muestra error
 * - Si todo sale bien, muestra mensaje de éxito
 *
 * Espera los campos: nombre, email, password, telefono, direccion
 *
 * Renderiza la vista register.ejs con el resultado
 */
const pool = require('./db');
const bcrypt = require('bcrypt');
app.post('/usuario/register', async (req, res) => {
  const { nombre, email, password, telefono, direccion } = req.body;
  // Validación básica
  if (!nombre || !email || !password) {
    return res.render('register', { error: 'Nombre, email y contraseña son obligatorios.', success: null });
  }
  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insertar usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash, telefono, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [nombre, email, hashedPassword, telefono, direccion]
    );
    // Mostrar mensaje de éxito
    res.render('register', { error: null, success: 'Usuario registrado exitosamente.' });
  } catch (error) {
    // Si el email ya existe
    if (error.code === '23505') {
      return res.render('register', { error: 'El email ya está registrado.', success: null });
    }
    // Otro error
    res.render('register', { error: 'Error al registrar usuario.', success: null });
  }
});
// --- Fin registro de usuario frontend ---

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}); 