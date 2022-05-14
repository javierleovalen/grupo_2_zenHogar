const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const productController = {
  index : (req, res) => {
    res.render('products/index')
  },

  createDev: (req,res) => {
    res.render('create_products-v2')
  },

  createDevResponse: (req,res) => {
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
    fs.writeFileSync(productsFilePath,JSON.stringify(products, null,'\t'));
    res.redirect('/products')
  },

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

modifyproduct: (req, res) => {
  const styles = ['normalize', 'home','modifyproduct']
  const titulo = 'modifyproduct'
  res.render('modifyproduct', {
      styles: styles,
      titulo: titulo,
  })
},

productDetail: (req, res) => {
  const item = products.find(item => {
      return item.id === req.params.item;

  });
  const styles = ['normalize', 'home', 'product-detail']
  const titulo = 'Zen Hogar | Detalle del Producto'
  res.render('product-detail', {
      styles: styles,
      titulo: titulo,
      item: item,
  });
},


};

module.exports = productController;  