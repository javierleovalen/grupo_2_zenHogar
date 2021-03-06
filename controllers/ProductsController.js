const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
const productsFilePath = path.join(__dirname, '../data/products/products.json');
const categoriesFilePath = path.join(__dirname, '../data/products/categories.json');
// Base de datos
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'))



const productController = {
  index: (req, res) => {
    let search = false
    let categoriesList = categories[0]
    res.render('products/index', {
      products: products,
      categories: categoriesList,
      search: search
    })
  },


  /*** CREAR PRODUCTO ***/
  createProduct: (req, res) => {
    res.render('./products/create', {
      categories:categories[0]
    })
  },

  /** CREATE PRODUCT: Upload product **/
  uploadProduct: (req, res) => {
    const results = validationResult(req);
    if (results.errors.length > 0) {
      return res.render('./products/create', {
        errors: results.mapped(),
        oldData: req.body,
        categories:categories[0]
      });
    }
    let newProduct = {
      id: Date.now(),
      productName: req.body.productName,
      productCategory: req.body.productCategory,
      productSize: req.body.productSize,
      productImg: req.file.filename,
      productPrice: parseInt(req.body.productPrice),
      productDescription: req.body.productDescription
    }
    products.push(newProduct)
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
    res.redirect('/products')
  },

  /*** BARRA BUSQUEDA ***/
  search: (req, res) => {
    let search = true
    let searchResults = products.filter(element => {
      return element.productName.toLowerCase().includes(req.query.keyword.toLowerCase()) === true
    })
    res.render('products/index', {
      products: searchResults,
      userSearch: req.query.keyword,
      categories: categories[0],
      search: search
    })
  },


  /*** CARRITO DE COMPRAS ***/
  cart: (req, res) => {
   
    res.render('products/cart', {
      products: products
     
    });
  },



  /*** EDITAR UN PRODUCTO ***/
  editproduct: (req, res) => {
    let productToEdit = products.find(element => { return element.id === parseInt(req.params.id) })
    res.render('./products/modify', { product: productToEdit })
  },

  /*** ACTUALIZAR DETALLE PRODUCTO ***/
  update: (req, res) => {
    let product = products.findIndex((element => {
      return element.id === parseInt(req.params.id)
    }))

    products[product].productName = req.body.productName === "" ? products[product].productName : req.body.productName;
    products[product].productCategory = req.body.productCategory === "" ? products[product].productCategory : req.body.productCategory;
    products[product].productSize = req.body.productSize === "" ? products[product].productSize : req.body.productSize;
    products[product].productPrice = req.body.productPrice === "" ? products[product].productPrice : parseInt(req.body.productPrice);
    products[product].productDescription = req.body.productDescription === "" ? products[product].productDescription : req.body.productDescription;
    // revisar cuando no cargo una imagen en el formulario genera un error, debo cargar siempre una imagen
    products[product].productImg = req.file.productImg === "" ? products[product].productImg : req.file.filename;
    



    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
    res.redirect('/products/detail/' + req.params.id)
  },


  /*** DETALLE DE PRODUCTO ***/
  productDetail: (req, res) => {
    let productToShow = products.find(product => { return product.id === parseInt(req.params.id) })
    res.render('./products/detail', {
      product: productToShow
    })
  },

  /*** BORRAR PRODUCTO ***/

  destroy: (req, res) => {
    let productUpdate = products.filter(element => {

      return element.id != req.params.id

    })

    products = productUpdate;
    fs.writeFileSync(productsFilePath, JSON.stringify(productUpdate));
    res.redirect('/product')

  }


};

module.exports = productController;  