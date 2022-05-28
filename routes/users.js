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
const { body, check } = require('express-validator');

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
  }),
  body('avatar').custom((value, { req }) => {
    let file = req.file
    let acceptedExtentions = ['.jpg','.png','.gif'];
    let fileExtentions = path.extname(file.originalname);

    if (!acceptedExtentions.includes(fileExtentions) ) {
      throw new Error(`las extensiones de archivo permitas son: ${acceptedExtentions.join(', ')}`);
    }
    return true;
  })

]

const loginValidation =[
  check('email','El email ingresado no es invalido').toLowerCase().isEmail().normalizeEmail(),  // validar mail no registrado
  check('password', 'contrasena invalida').isLength({min:2, max:16}), //cambiar minimo de contrasena
]




// HTTP: GET
router.get('/login', UsersController.login)
router.get('/profile/:id', UsersController.profile)
router.get('/register', UsersController.register)
router.get('/register/success', UsersController.registerSuccessful)

//HTTP: POST
router.post('/register', upload.single('avatar'), validations, UsersController.create)
router.post('/login', loginValidation, UsersController.loginValidation)

//HTTP: PUT
router.put('/profile/:id', upload.single('avatar'), UsersController.profileUpdate)



module.exports = router;