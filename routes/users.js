const express = require('express');
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
    cb(null, Date.now() + '-userImg' + path.extname(file.originalname))
  }
})

// Cargando variables de entorno de multer
const upload = multer({ storage })

// VALIDACIONES
const { body } = require('express-validator');

const validations = [
  body('firstName','Por favor completa este campo').notEmpty(),
  body('lastName','Por favor completa este campo').notEmpty(),
  body('email','El email ingresado no es invalido').toLowerCase().isEmail().normalizeEmail(),  // validar mail no registrado
  body('password', 'contrasena invalida').isLength({min:2, max:16}), //cambiar minimo de contrasena
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('la contrasena no coincide');
    }
    return true;
  })

]




// HTTP: GET
router.get('/login', UsersController.login)
router.get('/profile/:id', UsersController.profile)
router.get('/register', UsersController.register)
router.get('/register/success', UsersController.registerSuccessful)

//HTTP: POST
router.post('/register', upload.single('avatar'), validations, UsersController.create)
router.post('/login', UsersController.loginValidation)

//HTTP: PUT
router.put('/profile/:id', upload.single('avatar'), UsersController.profileUpdate)



module.exports = router;