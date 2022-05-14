const express = require ('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const ProductsController = require ('../controllers/ProductsController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./public/img/uploads/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ '-img'+ path.extname(file.originalname))
  }
})

const upload = multer({storage});

router.get('/products', ProductsController.index)

router.get('/cart', ProductsController.cart)

// CREAR PRODUCTO //
router.get('/products/create', ProductsController.create);
router.get('/products/create/dev', ProductsController.createDev);
router.post('/products/create/dev',upload.single('productImg'), ProductsController.createDevResponse)

// MODIFICAR PRODUCTO //
router.get('/products/modifyproduct/:id', ProductsController.modifyproduct);





module.exports = router;