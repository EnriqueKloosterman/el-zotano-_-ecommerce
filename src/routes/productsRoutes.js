const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productctsController');

//?     ******  Vista del detalle de producto   *****
router.get('/product-detail/:id', productsController.productDetailView);

module.exports = router;