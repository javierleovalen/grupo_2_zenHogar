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

//Sequelize DB

const db = require('../database/models');


const controller = {
  index: async (req, res) => {
    try {
      let user = await db.Product.findAll({ include: ['User'] })
      let cleanData = []
      user.forEach(element => {
        cleanData.push(element.toJSON());
      })

      return res.render('./users/admin/adminPanel', { products: cleanData })

    } catch (error) {
      console.log(error)
    }
  },
  productsList: (req, res) => {
    res.render('./users/admin/productsDashboard', { products: products })
  },
  usersList: (req, res) => {
    res.render('./users/admin/usersDashboard', { users: users })
  },
  delete: (req, res) => {
    let newProductList = products.filter(product => {
      return product.id != req.params.id
    })
    products = newProductList;
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'))
    res.redirect('/admin/products')
  },
  deleteUser: (req, res) => {
    let newUsersList = users.filter(user => {
      return req.params.id != user.id
    })
    users = newUsersList;
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, '\t'))
    res.redirect('/admin/users')
  },
  createProduct: async (req, res) => {
    try {
      let newProduct = {
        ...req.body,
        createdBy: req.session.userLogged.id,
        productImg: req.file ? req.file.filename : 'default.jpg',
        CategoryId: req.body.categoryId
      }

      console.log(newProduct)

      await db.Product.create({
        ...newProduct,
        includes: ['Category']
      })

      return res.redirect('/admin/dashboard')

    } catch (err) {

    }
  },
  createProductForm: async (req, res) => {
    try {

      let data = await db.Category.findAll()
      let cleanData = [];
      data.forEach(element => {
        cleanData.push(element.toJSON());
      })

      return res.render('./products/create', {
        categories: cleanData
      })

    } catch (error) {
      console.log(error)
    }
  },
  editProductForm: async (req, res) => {
    try {

      let data = await db.Category.findAll()
      let productoData = await db.Product.findOne({ where: { id: req.params.id }, includes: ['Category'] })
      let cleanData = [];
      let cleanProductData = productoData.toJSON()
      data.forEach(element => {
        cleanData.push(element.toJSON());
      })

      return res.render('./products/edit', {
        categories: cleanData,
        product: cleanProductData,
      })

    } catch (error) {
      console.log(error)
    }
  },
  editProductUpdate: async (req, res) => {
    try {
      let data = await db.Product.findOne({ where: { id: req.params.id }, includes: ['Category'] })
      let oldData = data.toJSON()

      let updatedData = {
        ...oldData,
        ...req.body,
        productImg: req.file ? req.file.filename : "",
      }

      await db.Product.update(
        updatedData,
        { where: { id: parseInt(req.params.id) } }
      )
      // console.log(updatedProduct)
      return res.redirect('/admin/dashboard')
    } catch (error) {
      console.log(error)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await db.Product.destroy({ where: { id: req.params.id } })
      res.redirect('/admin/dashboard')
    } catch (error) {
      console.log(error)
    }
  },
  manageUsers: async (req, res) => {
    try{
      let user = await db.User.findAll({ include: ['Rol'] })
      let cleanData = []
      user.forEach(element => {
        cleanData.push(element.toJSON());
      })

      return res.render('./users/admin/usersDashboard', { users: cleanData })
    } catch (error) {
      console.log(error)
    }
  },
  editUser: async (req, res) => {
    try {
      let data = await db.User.findOne({where:{id: req.params.id}, include:['Rol']});
      let rolData = await db.Role.findAll()
      let rolCleanData = [];
      rolData.forEach(element => {
        rolCleanData.push(element.toJSON())
      })
      let cleanData = data.toJSON();
      res.render('./users/admin/editUser',{user: cleanData, roles:rolCleanData});
    } catch (error) {
      console.log(error)
    }
  },
  uploadInfo: async (req, res) => {
    try {
      let data = await db.User.findOne({ where: { id: req.params.id }, includes: ['Rol'] })
      let oldData = data.toJSON()
      console.log(req.file)
      let updatedData = {
        ...oldData,
        ...req.body,
        profileImg: 'default.jpg' //Acomodar multer
      }
      await db.User.update(
        updatedData,
        { where: { id: parseInt(req.params.id) } }
      )
      return res.redirect('/admin/dashboard/users')
    } catch (error) {
      console.log(error)
    }
  },
  deleteUser: async (req, res) => {
      try {
        await db.User.destroy({ where: { id: req.params.id } })
        res.redirect('/admin/dashboard/users')
      } catch (error) {
        console.log(error)
      }
  },
  manageCategories: async (req,res) => {
    try {
      let data = await db.Category.findAll()
      let cleanData = []
      data.forEach(element => {
        cleanData.push(element.toJSON())
      })
      res.render('./users/admin/categoriesDashboard', {categories: cleanData})
    } catch (error) {
      console.log(error)
    }
  },
  addCategory: async (req, res) => {
    try {
      await db.Category.create({
        ...req.body
      })
      res.redirect('/admin/dashboard/categories')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = controller;