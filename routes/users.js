const express = require ('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController')


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
router.get('/register', UsersController.register)
router.get('/register/success', UsersController.registerSuccessful)

//HTTP: POST
router.post('/register', UsersController.create)
router.post('/login', UsersController.loginValidation)

module.exports = router;