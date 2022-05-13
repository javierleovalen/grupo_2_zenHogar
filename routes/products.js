const express = require ('express');
const router = express.Router();
const ProductsController = require ('../controllers/ProductsController');

router.get('/products', ProductsController.index)

router.get('/cart', ProductsController.cart)

// CREAR PRODUCTO //
router.get('/create', ProductsController.create);

// MODIFICAR PRODUCTO //
router.get('/modifyproduct', ProductsController.modifyproduct);



module.exports = router;