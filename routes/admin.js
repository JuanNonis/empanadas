const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.put('/menu', adminController.updateMenu);
router.post('/ingredientes', adminController.addIngredientsOrder);

module.exports = router; 