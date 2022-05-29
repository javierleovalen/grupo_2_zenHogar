const path = require('path')
const { body } = require('express-validator');


const validations = [
    body('firstName','Por favor completa este campo').notEmpty(),
    body('lastName','Por favor completa este campo').notEmpty(),
    body('email','El email ingresado no es invalido').toLowerCase().isEmail().normalizeEmail(),  // validar mail no registrado
    body('password', 'contrasena invalida').isLength({min:2, max:16}), //cambiar minimo de contrasena
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('la contrasena no coincide');
      }
      return true;
    }),
    body('avatar').custom((value, { req }) => {
      let file = req.file
      let acceptedExtentions = ['.jpg','.png','.gif'];
      let fileExtentions = path.extname(file.originalname);
  
      if (!acceptedExtentions.includes(fileExtentions) ) {
        throw new Error(`las extensiones de archivo permitas son: ${acceptedExtentions.join(', ')}`);
      }
      return true;
    }).bail()
  
  ]

  module.exports = validations;

