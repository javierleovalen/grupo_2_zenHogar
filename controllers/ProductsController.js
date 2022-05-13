const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, './data/products/products');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
  index : (req, res) => {
    res.render('products/index')
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