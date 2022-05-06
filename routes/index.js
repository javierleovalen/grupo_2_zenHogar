const express = require ('express');
const router = express.Router();
const MainController = require ('../controllers/MainController');
const CartController = require ('../controllers/CartController');



router.get('/', MainController.home);

router.get('/login', MainController.login);

router.get('/cart', CartController.index);

router.get('/test', MainController.test);

router.get('/register', MainController.register);

router.get('/productDetail', CartController.productDetail);






module.exports = router;
