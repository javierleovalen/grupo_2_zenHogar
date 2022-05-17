const express = require ('express');
const router = express.Router();
const MainController = require ('../controllers/MainController');
const productsRouter = require('./products')
const usersRouter = require('./users')


// HOME //
router.get('/', MainController.home);

router.use('/products',productsRouter)
router.use('/users', usersRouter)

// 404 si la ruta no existe

module.exports = router;