const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/menu', mainController.menu);
router.get('/carrito', mainController.carrito);

module.exports = router; 