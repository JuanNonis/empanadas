const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.put('/', userController.updateUser);
router.post('/pedido', userController.createOrder);
router.get('/pedido/:id', userController.getOrderStatus);

module.exports = router; 