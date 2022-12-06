const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productctsController');
const upload = require('../middlewares/multerProducts');
const admin = require('../middlewares/adminAccessMiddleware');


//?     ******     Creación de productos      ******
router.get('/create-product', admin, productsController.createProductView);
router.post('/create-product', upload.array("image", 5), productsController.store);
//?     ******      Agregar nuevo Tag       ******
router.get('/add-new-tag', admin, productsController.addNewTagView);
router.post('/add-new-tag', productsController.addNewTag);
//?     ******      Agregar nueva marca     ******
// router.get('/add-new-brand', admin, productsController.addNewBrand);
router.post('/addBrand', productsController.addNewBrand);
//?     ******      Agregar nuevo Fabricante    ******
router.post('/addManufactorer', productsController.addNewManufactorer);

//?     ******      Edición de productos      ******
router.get('/edit-product/:id', admin, productsController.editProductVIew);
router.post('/:id', upload.array('image', 5), productsController.updateProducts);

//?     ******      Admin Panel     ******
router.get('/admin-panel', admin, productsController.adminPanelView);

//?     ******     listado de productos    ******
router.get('/product-list', admin, productsController.productsList);



module.exports = router;