const fs = require('fs')
const path = require('path')

let usersFilePath = path.join(__dirname, '../data/users/users.json')
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
  login: (req,res) => {
    res.render('login')
  },
  register: (req, res) => {
    res.render('register')
  },
  create: (req, res) => {
    let newAccount = {
      id: Math.floor(Math.random() * 1000),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      isAdmin: false,
      image: 'Placeholder de url p/ img'
    }
    users.push(newAccount);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
    res.redirect('/users/register/success')
  },
  registerSuccessful: (req,res)=> {
    res.render('register_success')
  },
  loginValidation: (req,res) => {
    res.send('Login exitoso')
  }
  
}

module.exports = usersController