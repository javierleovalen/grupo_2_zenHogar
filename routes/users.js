const express = require ('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController')
const multer = require('multer')
const path = require('path')

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/uploads/users/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id + '-img' + path.extname(file.originalname))
  }
})

// Cargando variables de entorno de multer
const upload = multer({storage})

// VALIDACIONES
const {check, body} = require('express-validator');

const validations = [
  check('firstName').notEmpty().withMessage('Por favor completa este campo'),
  check('lastName').notEmpty().withMessage('Por favor completa este campo'),
  check('email').toLowerCase().isEmail().normalizeEmail().withMessage('El email ingresado no es valido'),
  check('password').isLength({min:8, max:16})
]




// HTTP: GET
router.get('/login', UsersController.login)
router.get('/profile/:id', UsersController.profile)
router.get('/register', UsersController.register)
router.get('/register/success', UsersController.registerSuccessful)

//HTTP: POST
router.post('/register', UsersController.create)
router.post('/login', UsersController.loginValidation)

//HTTP: PUT
router.put('/profile/:id',upload.single('avatar'),UsersController.profileUpdate)



module.exports = router;