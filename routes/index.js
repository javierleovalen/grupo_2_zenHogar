const express = require ('express');
const router = express.Router();
const MainController = require ('../controllers/MainController');
const CartController = require ('../controllers/CartController');



router.get('/', MainController.home);

router.get('/login', MainController.login);

// router.get('/cart', CartController.index); * Corregir controllers

router.get('/test', MainController.test);

router.get('/register', MainController.register);

// router.get('/productDetail', CartController.productDetail); * Corregir controllers

// router.get('/createProduct', CartController.createProduct); * Corregir controllers

router.get('/product/create', MainController.createProduct)

router.get('/product/modify', MainController.modifyProduct)







module.exports = router;
