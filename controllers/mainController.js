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

exports.menu = (req, res) => {
  // Menú de ejemplo
  const menu = [
    { nombre: 'Empanada de Carne', precio: 500, descripcion: 'Clásica empanada argentina de carne.' },
    { nombre: 'Empanada de Pollo', precio: 500, descripcion: 'Empanada rellena de pollo y especias.' },
    { nombre: 'Pizza Muzarella', precio: 1200, descripcion: 'Pizza tradicional de muzzarella.' }
  ];
  res.render('menu', { menu });
};

exports.carrito = (req, res) => {
  res.render('carrito');
}; 