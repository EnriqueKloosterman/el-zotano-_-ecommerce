const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productctsController');

//?     ******  Vista del detalle de producto   ******
router.get('/product-detail/:id', productsController.productDetailView);

//?     ****** Vista por colecciones(brand)    ******
router.get('/brand', productsController.brandCollection);
router.get('/brand/:brand', productsController.brandSelected);

//?     ******  Vista por Tags      ******
router.get('/tag', productsController.productTag);
router.get('/tag/:tag', productsController.tagSelected)

//?     ****** VIsta por Fabricante     ******
router.get('/manufactorer', productsController.productManufactorer);
router.get('/manufactorer/:manufactorer', productsController.manufactorerSelected);


module.exports = router;