const express = require ('express');
const router = express.Router();
const MainController = require ('../controllers/MainController');



router.get('/', MainController.home);

router.get('/login', MainController.login);

router.get('/cart', MainController.cart);

router.get('/test', MainController.test);

router.get('/register', MainController.register);

router.get('/productDetail', MainController.productDetail);

router.get('/create', MainController.create);







module.exports = router;
