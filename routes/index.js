const express = require ('express');
const router = express.Router();
const MainController = require ('../controllers/MainController');


// HOME //
router.get('/', MainController.home);


// FORMULARIO LOGIN //
router.get('/login', MainController.login);


// CARRITO DE COMPRAS //
router.get('/cart', MainController.cart);


// HOJA DE PRUEBA //
router.get('/test', MainController.test);


// FORMULARIO DE REGISTO //
router.get('/register', MainController.register);



// DETALLE DE PRODUCTO //
router.get('/productDetail/:item', MainController.productDetail);


// CREAR PRODUCTO //
router.get('/create', MainController.create);







module.exports = router;
