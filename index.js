// Requiere instalar express: npm install express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use('/', mainRoutes);
app.use('/usuario', userRoutes);
app.use('/admin', adminRoutes);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}); 