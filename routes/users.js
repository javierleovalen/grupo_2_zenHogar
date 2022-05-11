const express = require ('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController')

// HTTP: GET
router.get('/users/login', UsersController.login)
router.get('/users/register', UsersController.register)
router.get('/users/register/success', UsersController.registerSuccessful)

//HTTP: POST
router.post('/users/register', UsersController.create)
router.post('/users/login', UsersController.loginValidation)

module.exports = router;