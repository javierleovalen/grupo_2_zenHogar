const express = require ('express');
const router = express.Router();
const productsController = require ('../controllers/ProductsController');

router.get('/products', productsController.index)
module.exports = router;