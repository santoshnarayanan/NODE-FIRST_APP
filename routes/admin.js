const path = require('path');
const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);
//filtering request based on method
router.post('/add-product', );

module.exports = router;