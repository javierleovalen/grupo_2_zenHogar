const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const ProductsController = require('../controllers/ProductsController');
const { body } = require('express-validator')

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/uploads/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-img' + path.extname(file.originalname))
  }
})

const multerFileFilter = (req, file, cb) => { 
  let ext = path.extname(file.originalname)
  let acceptedExtensions = ['.jpg', '.png', '.jpeg']
  if(!acceptedExtensions.includes(ext)) {
    return cb(null,false)
  }
  return cb(null,true)
}

// Cargando variables de entorno de multer
const upload = multer({ storage,fileFilter: multerFileFilter });

/** CREATE PRODUCT: Validations **/
const createProductsValidations = [
  body('productName').notEmpty().withMessage('Debe ingresar un nombre para el producto.'),
  body('productCategory').notEmpty().withMessage('Debe seleccionar una categoria para el producto.'),
  body('productSize').notEmpty().withMessage('Debe especificar las medidas del producto.'),
  body('productPrice').notEmpty().withMessage('Debe ingresar el precio.').bail().isNumeric().withMessage('Solo se permiten números en el campo "Precio:"'),
  body('productDescription').notEmpty().withMessage('Por favor escriba una descripción para su producto.'),
  body('productImg').custom((value, { req }) => {
    let file = req.file;

    if (!file) {
      throw new Error('Debes elegir un tipo de archivo valido');
    }
      return true
    })
]



// INDEX DE PRODUCTOS
router.get('/', ProductsController.index);

// BUSCAR PRODUCTO
router.get('/search', ProductsController.search);

/** CREATE PRODUCT: Sending form to view **/ 
router.get('/create', ProductsController.createProduct);

/** CREATE PRODUCT: Process product **/
router.post('/create',upload.single('productImg'),createProductsValidations,ProductsController.uploadProduct);

// MODIFICAR PRODUCTO //
router.get('/modify/:id', ProductsController.modifyproduct);
router.put('/modify/:id', upload.single('productImg'), ProductsController.update);

// DETALLE DEL PRODUCTO //
router.get('/detail/:id', ProductsController.productDetail);

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', ProductsController.destroy);

// DETALLE CARRITO DE COMPRAS //
router.get('/cart', ProductsController.cart);

module.exports = router;