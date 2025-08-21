const pool = require('../db');
const bcrypt = require('bcrypt');

/**
 * POST /usuario/register (API)
 * Registra un nuevo usuario desde una petición API (no formulario)
 * - Valida nombre, email y password
 * - Encripta la contraseña
 * - Inserta el usuario en la base de datos
 * - Devuelve el usuario creado o error
 *
 * Espera JSON: { nombre, email, password, telefono, direccion }
 *
 * Respuestas:
 * 201: { usuario }
 * 400: { error }
 * 409: { error }
 * 500: { error }
 */
exports.registerUser = async (req, res) => {
  const { nombre, email, password, telefono, direccion } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash, telefono, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, email, telefono, direccion, rol, fecha_creacion',
      [nombre, email, hashedPassword, telefono, direccion]
    );
    res.status(201).json({ usuario: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
};

/**
 * POST /usuario/login
 * (A implementar) Login de usuario
 */
exports.login = (req, res) => {
  res.send('Login de usuario');
};

/**
 * PUT /usuario
 * (A implementar) Modificar datos de usuario
 */
exports.updateUser = (req, res) => {
  res.send('Modificar datos de usuario');
};

/**
 * POST /usuario/pedido
 * (A implementar) Crear pedido
 */
exports.createOrder = (req, res) => {
  res.send('Hacer un pedido');
};

/**
 * GET /usuario/pedido/:id
 * (A implementar) Consultar estado de pedido
 */
exports.getOrderStatus = (req, res) => {
  res.send('Revisar estado del pedido (entregado/en camino)');
}; 