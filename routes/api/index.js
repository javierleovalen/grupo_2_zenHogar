const express = require ('express');
const router = express.Router();
const path = require('path')
const apiController = require('../../controllers/api/apiController.js')

//API ENDPOINT

router.get('/api/carts', apiController.carts) //Working
router.get('/api/cartdetails', apiController.users)// Working
router.get('/api/categories', apiController.categories) //Working
router.get('/api/images', apiController.img) //Working
router.get('/api/products', apiController.products) //Working
router.get('/api/rol', apiController.roles) //Working
router.get('/api/users', apiController.users) //Working

module.exports = router