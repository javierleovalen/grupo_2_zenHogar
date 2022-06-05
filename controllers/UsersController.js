const fs = require('fs')
const path = require('path')
const { validationResult, body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const User = require('../models/User')


let usersFilePath = path.join(__dirname, '../data/users/users.json')
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
  //########### LOGIN ##########
  login: (req, res) => {
    res.render('./users/login')
  },

  //########### REGISTRAR USAURIO ###########
  register: (req, res) => {
    res.render('./users/register')
  },

  //############# CREAR USUARIO ############
  create: (req, res) => {
    const resultValidation = validationResult(req)
    if (resultValidation.errors.length > 0) {
      return res.render('./users/register', {
        errors: resultValidation.mapped()
      })
    }

    let emailInUse = User.findByField('email', req.body.email);
    if (emailInUse) {
      return res.render('./users/register', {
        errors: {
          email: {
            msg: 'Este email ya está en uso.'
          }
        }
      })
    }
    delete req.body.confirmPassword

    let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      avatar: req.file ? req.file.filename : 'default.png'
    }

    User.create(userToCreate);
    res.redirect('/users/register/success')
  },

  //############# REGISTRO EXITOSO ##############
  registerSuccessful: (req, res) => {
    res.render('./users/register_success')
  },


  // Procesando login
  loginValidation: (req, res) => {
    let userToLogin = User.findByField('email', req.body.email)
    if (userToLogin) {
      let passwordCheck = bcryptjs.compareSync(req.body.password, userToLogin.password)
      if (passwordCheck) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        if(req.body.remember_me) {
          res.cookie('userKey',req.body.email, {maxAge: (1000 * 60) * 60})
        }
        return res.redirect('/users/profile')
      }
    }
    return res.render('./users/login', {
      errors: {
        email: {
          msg: 'Los datos ingresados no son correctos, por favor intente nuevamente.'
        }
      }
    })
  },

  //########## PERFIL DE USUARIO ################
  profile: (req, res) => {
    res.render('./users/profile', { user: req.session.userLogged })
  },

  //############ ACTUALIZAR PERFIL USUARIO ##############
  profileUpdate: (req, res) => {
    let user = users.findIndex((element => {
      return element.id === parseInt(req.params.id)
    }))

    users[user].firstName = req.body.firstName
    users[user].lastName = req.body.lastName
    users[user].email = req.body.email
    users[user].passwrod = req.body.password
    users[user].avatar = req.file.filename ? req.file.filename : 'default.png';
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, '\t'));
    res.redirect('/users/profile/' + req.params.id)
  },
  logout : (req,res) => {
    res.clearCookie('userKey');
    req.session.destroy();
    return res.redirect('/')
  }

}

module.exports = usersController