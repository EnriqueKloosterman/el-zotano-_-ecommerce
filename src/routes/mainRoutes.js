const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productsController = require('../controllers/productctsController');

//?     ****** vista del home ******
router.get('/', mainController.index);




module.exports = router;