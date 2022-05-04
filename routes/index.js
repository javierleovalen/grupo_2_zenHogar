const express = require ('express');
const router = express.Router();
const MainController = require ('../controllers/MainController');
const CartController = require ('../controllers/CartController');



router.get('/', MainController.index);

router.get('/login', MainController.login);

router.get('/cart', CartController.index);

router.get('/test', MainController.test)






module.exports = router;
