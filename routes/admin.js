const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const adminController = require('../controllers/adminController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/uploads/products');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-product' + path.extname(file.originalname))
    }
})


const upload = multer({storage})


router.get('/dashboard', adminController.index)
router.get('/products', adminController.productsList)
router.get('/users', adminController.usersList)

router.delete('/delete/:id', adminController.delete)
router.delete('/delete/user/:id', adminController.deleteUser)


/* Products */
//Create Product
router.get('/products/create', adminController.createProductForm)
router.post('/products/create', upload.single('productImg'),adminController.createProduct)

//Edit Product;
router.get('/products/edit/:id', adminController.editProductForm)
router.patch('/products/edit/:id',upload.single('productImg'), adminController.editProductUpdate)

//Delete Product
router.delete('/products/delete/:id', adminController.deleteProduct)

/* Users */
router.get('/dashboard/users', adminController.manageUsers)
//Edit User
router.get('/users/edit/:id', adminController.editUser);
router.patch('/users/edit/:id', adminController.uploadInfo)
//Delete user
router.delete('/users/delete/:id', adminController.deleteUser)

/* Categories */
//List categories
router.get('/dashboard/categories', adminController.manageCategories)
//Create category
router.post('/categories/add', adminController.addCategory)
module.exports = router;