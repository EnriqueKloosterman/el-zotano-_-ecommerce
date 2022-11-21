const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productctsController');
const upload = require('../middlewares/multerProducts');


//?     ******     Creación de productos      ******
router.get('/create-product', productsController.createProductView);
router.post('/create-product', upload.array("image", 4), productsController.store);

//?     ******      Edición de productos      ******
router.get('/edit-product/:id', productsController.editProductVIew);
router.post('/:id', upload.array('image', 4), productsController.updateProducts);



module.exports = router;