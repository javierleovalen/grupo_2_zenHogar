const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
const productsFilePath = path.join(__dirname, '../data/products/products.json');
const categoriesFilePath = path.join(__dirname, '../data/products/categories.json');
const usersFilePath = path.join(__dirname, '../data/users/users.json');
// Base de datos
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'))
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))


const controller = {
  index: (req, res) => {
    res.render('./users/admin/adminPanel')
  },
  productsList: (req,res) => {
    res.render('./users/admin/productsDashboard', {products:products})
  },
  usersList: (req,res) => {
    res.render('./users/admin/usersDashboard', {users:users})
  },
  delete: (req,res) => {
    let newProductList = products.filter(product => {
      return product.id != req.params.id
    })
    products = newProductList;
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'))
    res.redirect('/admin/products')
  },
  deleteUser: (req,res) => {
    let newUsersList = users.filter(user => {
      return req.params.id != user.id
    })
    users = newUsersList;
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, '\t'))
    res.redirect('/admin/users')
  }
}

module.exports = controller;