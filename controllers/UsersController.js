const fs = require('fs')
const path = require('path')
const { validationResult, body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const User = require('../models/User')
const db = require('../database/models/index')


let usersFilePath = path.join(__dirname, '../data/users/users.json')
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
  //########### LOGIN ##########
  login: (req, res) => {
    res.render('./users/login');
  },

  //########### REGISTRAR USAURIO ###########
  register: (req, res) => {
    res.render('./users/register')
  },

  //############# CREAR USUARIO ############
  create: (req, res) => {
    let emailInUse = db.Usuarios.findOne({ where: { email: req.body.email } })
      .then(function (email) {
        if (email) {
          return res.render('./users/register', {
            data: req.body,
            errors: {
              msg: 'El email ya se encuentra en uso'
            }
          });
        } else {
          db.Usuarios.create({
            ...req.body,
            avatar: 'default.jpg',
          }).then(() => {
            res.redirect('/users/login')
          });
        }
      });
  },

  //############# REGISTRO EXITOSO ##############
  registerSuccessful: (req, res) => {
    res.render('./users/register_success')
  },


  // Procesando login
  loginValidation: (req, res) => {
    db.Usuarios.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user.dataValues.password === req.body.password) {
          delete user.dataValues.password
          req.session.userLogged = user.dataValues
          if (req.body.remember_me) {
            res.cookie('token', req.body.email, { maxAge: (1000 * 60) * 60 })
          }
          res.redirect('/')
        } else {
          return res.render('./users/login', { data: req.body.email });
        }
      })
  },

  //########## PERFIL DE USUARIO ################



  profile: (req, res) => {
    res.render('./users/profile', { user: req.session.userLogged });
  },

  editInfo: function (req, res) {
    db.Usuarios.findOne({ where: { id: req.params.id } })
      .then((data) => {
        delete data.dataValues.password
        return res.render('./users/editinfo', { data: data.dataValues })
      })
      .catch((error) => {
        return res.send('Ooops! Algo salio muy mal')
      })
  },


  //############ ACTUALIZAR PERFIL USUARIO ##############
  saveNewInfo: async (req, res) => {
    try {
      let userId = req.params.id;

      let updatedUser = {...oldData,...req.body};

      if(req.file) {
        updatedUser.avatar = req.file.filename
      };

      await db.Usuarios.update(updatedUser,{
          where: { id: userId }
        });
        
      req.session.userLogged = updatedUser;
      return res.redirect('/users/profile');

    } catch (error) {
      return res.send('Ooops! algo salio muy mal...')
    }
  },
  logout: (req, res) => {
    res.clearCookie('token');
    req.session.destroy();
    return res.redirect('/');
  },
}

module.exports = usersController