const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')



let usersFilePath = path.join(__dirname, '../data/users/users.json')
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
  login: (req, res) => {
    res.render('./users/login')
  },
  register: (req, res) => {
    res.render('./users/register')
  },
  create: (req, res) => {
    const resultValidation = validationResult(req)
    if (resultValidation.errors.length > 0) {
      return res.render('./users/register', {
        errors: resultValidation.mapped()
      })
    }

    let newAccount = {
      id: Date.now(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      isAdmin: false,
      avatar: req.file ? req.file.filename : 'default.png'

    }
    users.push(newAccount);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
    res.redirect('/users/register/success')

  },
  registerSuccessful: (req, res) => {
    res.render('./users/register_success')
  },

  loginValidation: (req, res) => {
// ########## PENDIENTE   ########## //

    // const loginErrors = validationResult(req);

    // if (loginErrors.errors.length > 0) {

    //   return res.render('./users/login', {
    //     errors: loginErrors.mapped()
    //   })

    // }

      for (let i = 0; i < users.length; i++) {

        if (users[i].email === req.body.email) {

          // if (bcrypt.compareSync(req.body.password, users[i].password)){}   PENDIENTE APLICAR bcrypt

            return res.render('./users/login_success',{users:users})


          // let userToLogin = users[i]
          // break;
           
        } else {

        }

  }


  },


  profile: (req, res) => {
    let currentUser = users.find(user => {
      return user.id == req.params.id
    })
    res.render('./users/profile', { user: currentUser })
  },
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
  }

}

module.exports = usersController