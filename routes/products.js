const express = require ('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const ProductsController = require ('../controllers/ProductsController');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./public/img/uploads/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ '-img'+ path.extname(file.originalname))
  }
})

// Cargando variables de entorno de multer
const upload = multer({storage});

// INDEX DE PRODUCTOS
router.get('/', ProductsController.index);

// BUSCAR PRODUCTO
router.get('/search', ProductsController.search);

// CREAR PRODUCTO //
router.get('/create', ProductsController.createProduct);
router.post('/create',upload.single('productImg'), ProductsController.uploadProduct);

// MODIFICAR PRODUCTO //
router.get('/modify/:id', ProductsController.modifyproduct);
router.put('/modify/:id', upload.single('productImg'),ProductsController.update); 

// DETALLE DEL PRODUCTO //
router.get('/detail/:id', ProductsController.productDetail);

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', ProductsController.destroy); 

// DETALLE CARRITO DE COMPRAS //
router.get('/cart', ProductsController.cart);

module.exports = router;