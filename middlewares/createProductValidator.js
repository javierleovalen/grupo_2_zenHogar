const {body} = require('express-validator');
const validations = [
  body('name')
  .trim()
  .notEmpty().bail().withMessage('Debes ingresar un nombre para el producto')
  .isLength({min:5, max:45}).bail().withMessage('Debes ingresar un nombre entre 5 y 45 caracteres'),
  body('description')
  .trim()
  .notEmpty().bail().withMessage('Debes ingresar una descripción para el producto'),
  body('price')
  .trim()
  .notEmpty().bail().withMessage('Debes ingresar un precio')
  .isNumeric().bail().withMessage('Solo se permiten números en el precio'),
  body('productImg')
  .notEmpty().bail().withMessage('Debes ingresar una foto para tu producto'),
  body('stock')
  .notEmpty().bail().withMessage('Debes ingresar un numero de stock (este valor puede ser modificado más adelante)')
  .isNumeric().bail().withMessage('Solo se permiten números en el campo de stock'),
  body('createdBy')
  .notEmpty().bail().withMessage('Created by -> campo a modo testing, no requiere validar'),
  body('categoryId')
  .notEmpty().bail().withMessage('Debes ingresar una categoria'),
]

module.exports = validations;