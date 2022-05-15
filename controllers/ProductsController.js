const fs = require('fs');
const path = require('path');

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



  createProduct: (req, res) => {
    res.render('create_products-v2')
  },

  uploadProduct: (req, res) => {
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

  search: (req,res) => {
    let search = true
    let searchResults = products.filter (element => {
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
    const styles = ['normalize', 'home', 'cart']
    const titulo = 'Zen Hogar | Mi Carrito'
    res.render('cart', {
      styles: styles,
      titulo: titulo,
      products: products,
    });
  },



  create: (req, res) => {
    const styles = ['normalize', 'home', 'create']
    const titulo = 'Zen Hogar | Crear Producto'
    res.render('create', {
      styles: styles,
      titulo: titulo,
    });
  },



  /*** EDITAR UN PRODUCTO ***/
  modifyproduct: (req, res) => {
    let productToModify = products.find(product => {
      return product.id === parseInt(req.params.id);
    })
    res.render('./products/modify',{product: productToModify})
  },

  /*** ACTUALIZAR DETALLE PRODUCTO ***/
  update: (req, res) => {
  //  PRIMERO BUSCAR EL PRODUCT A MODIFICAR
  // VALIDAR LA INFO DEL FORMULARIO (SI ES UN STRING VACIO NO REEMPLAZAR VALOR) EN PRECIOS E ID TIENE QUE SER NUMEROS ENTEROS (PARSE INT)
  // REEMPLAZAR EL VALOR EN LA VARIABLE GLOBAL(PRODUCTS) QUE NOS TRAE TODA LA INFO (MODELO)
  // ESCRIBIR EN EL JSON EL NUEVO VALOR DE PRODUCTS CON EL PRODUCTO MODIFICADO
  },


  /*** DETALLE DE PRODUCTO ***/
  productDetail: (req, res) => {
    let productToShow = products.find(product => { return product.id === parseInt(req.params.id)})
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