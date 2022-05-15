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


// BUSCAR PRODUCTO
router.get('/products/search', ProductsController.search)

// CREAR PRODUCTO //
router.get('/products/create', ProductsController.createProduct);
router.post('/products/create',upload.single('productImg'), ProductsController.uploadProduct)

// MODIFICAR PRODUCTO //
router.get('/products/modify/:id', ProductsController.modifyproduct);
router.put('/products/modify/:id', upload.single('productImg'),ProductsController.update); 


// DETALLE DEL PRODUCTO //
router.get('/products/detail/:id', ProductsController.productDetail);


/*** DELETE ONE PRODUCT***/ 
router.delete('/products/delete/:id', ProductsController.destroy); 

// DETALLE CARRITO DE COMPRAS //
router.get('/products/cart', ProductsController.cart);


module.exports = router;