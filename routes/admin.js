const express = require('express');
const router = express.Router();
const path = require('path')

const AdminController = require('../controllers/AdminController')

router.get('/dashboard', AdminController.index)
router.get('/products', AdminController.productsList)
router.get('/users', AdminController.usersList)

router.delete('/delete/:id', AdminController.delete)
router.delete('/delete/user/:id', AdminController.deleteUser)
module.exports = router;