const {body} = require('express-validator')
const db = require("../database/models");

const validations = {
  register: [

    /* Register > Validate email */
    body('email')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar un email.')
    .isEmail().bail().withMessage('Debe ser un formato de mail válido.')
    .normalizeEmail(),

    /* Register > Email not taken */
    body('email')
    .trim()
    .custom((value, {req}) => {
      return db.User.findOne({ where: { email: req.body.email} })
      .then(emailExists => {
        if(emailExists) {
          return Promise.reject('El email se encuentra en uso');
        }
      })
    }),

    /* Register > Validate name */
    body('name')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar un nombre.')
    .isLength({min:3, max:10}).withMessage('El campo nombre debe tener entre 3 y 10 caracteres.'),

    /* Register > Validate password */
    body('password')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar una contraseña')
    .isLength({min:4, max:8}).bail().withMessage('La contraseña debe contener entre 4 y 8 caracteres'),

    /* Register > Validate repassword */
    body('repassword')
    .trim()
    .notEmpty().bail().withMessage('Por favor repita su contraseña')
    .custom((value, {req}) => {
      if(value != req.body.password) {
        return Promise.reject('Las contraseñas no coinciden');
      }
      return true;
    })
  ],
  login: [
    /* Login > Validate email */
    body('email')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar un email.')
    .isEmail().bail().withMessage('Debe ser un formato de mail válido.')
    .normalizeEmail(),
    /* Login > Check if email exists on our db */
    body('email')
    .custom((value, {req}) => {
      return db.User.findOne({ where: { email: req.body.email } })
      .then(emailExists => {
        if(!emailExists) {
          return Promise.reject('El email ingresado no pertenece a un usuario registrado');
        }
      })
    }),

    /* Login > Validate password */
    body('password')
    .trim()
    .notEmpty().bail().withMessage('Debes ingresar una contraseña')
    .isLength({min:6, max:16}).bail().withMessage('La contraseña debe contener entre 6 y 16 caracteres')
  ]
}

module.exports = validations;