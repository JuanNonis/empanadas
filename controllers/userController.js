exports.login = (req, res) => {
  res.send('Login de usuario');
};

exports.updateUser = (req, res) => {
  res.send('Modificar datos de usuario');
};

exports.createOrder = (req, res) => {
  res.send('Hacer un pedido');
};

exports.getOrderStatus = (req, res) => {
  res.send('Revisar estado del pedido (entregado/en camino)');
}; 