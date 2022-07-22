const express = require ('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');
const apiController = require('../../controllers/api/apiControllerV2.js')
const apiProductsController = require('../../controllers/api/apiControllerProducts.js')
const userValidations = require('../../middlewares/userValidations');
const createProductValidator = require('../../middlewares/createProductValidator')

//FILE MANAGER
/* Multer Settings */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/uploads/users');
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id + '-userAvatar.jpg');
  },
});

/* Multer Env */
const upload = multer({ storage });

//API ENDPOINTS
//Crud de usuarios
router.post('/api/usuarios/create',userValidations.register,apiController.createUser)
router.post('/api/usuarios/login',userValidations.login,apiController.loginUser)
router.patch('/api/usuarios/edit/:id',apiController.editUserInfo)
router.delete('/api/usuarios/delete/:id', apiController.deleteUser)

//Listar usuarios
router.get('/api/usuarios/list', apiController.listUsers)

//Products CRUD;
router.get('/api/products/list', apiProductsController.listAll)
router.post('/api/products/create',createProductValidator ,apiProductsController.create)
module.exports = router