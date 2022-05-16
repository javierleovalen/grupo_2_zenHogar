const express = require ('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController')

// HTTP: GET
router.get('/login', UsersController.login)
router.get('/register', UsersController.register)
router.get('/register/success', UsersController.registerSuccessful)

//HTTP: POST
router.post('/register', UsersController.create)
router.post('/login', UsersController.loginValidation)

module.exports = router;