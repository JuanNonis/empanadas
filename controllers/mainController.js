exports.home = (req, res) => {
  // Imágenes locales de empanadas para el carrusel
  const carrusel = [
    '/empanada1.jpg',
    '/empanada2.jpg',
    '/pizza.jpg'
  ];
  const infoRandom = '¡Las mejores empanadas de la ciudad!';
  res.render('index', { carrusel, infoRandom });
};

// Cargar menú desde JSON
const menuItems = require('../db/menu.json');



exports.menu = (req, res) => {
  res.render('menu', { menu: menuItems });
};

exports.carrito = (req, res) => {
  res.render('carrito');
}; 

