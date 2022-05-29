const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const multer = require('multer')
const path = require('path')
const loginValidation = require('../middlewares/loginValidations');
const validations = require ('../middlewares/registerValidations')

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
const { required } = require('nodemon/lib/config');  //Preguntar para que sirve esta linea (J)



// HTTP: GET
router.get('/login', UsersController.login)
router.get('/profile/:id', UsersController.profile)
router.get('/register', UsersController.register)
router.get('/register/success', UsersController.registerSuccessful)

// Test session
router.get('/pruebaSession',UsersController.testSession)
router.get('/MostrarNumero',UsersController.testSession2)


//HTTP: POST
router.post('/register', upload.single('avatar'), validations, UsersController.create)
router.post('/login', loginValidation, UsersController.loginValidation)

//HTTP: PUT
router.put('/profile/:id', upload.single('avatar'), UsersController.profileUpdate)





module.exports = router;