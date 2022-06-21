const express = require ('express');
const router = express.Router();
const MainController = require ('../controllers/MainController');
const productsRouter = require('./products')
const usersRouter = require('./users')
const adminRouter = require('./admin')
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')


// HOME //
router.get('/', MainController.home);

router.use('/products',productsRouter)
router.use('/users', usersRouter)
router.use('/admin', isAdminMiddleware,adminRouter)

// 404 si la ruta no existe

module.exports = router;