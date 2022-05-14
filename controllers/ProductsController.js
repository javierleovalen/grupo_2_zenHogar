const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const productController = {
  index: (req, res) => {
    res.render('products/index',{
    })
  },



  createDev: (req, res) => {
    res.render('create_products-v2')
  },

  createDevResponse: (req, res) => {
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

    let productToEdit = products.find(element => { return element.id === parseInt(req.params.id) })

    res.render('modifyproduct', {
      productToEdit: productToEdit,

    })
  },

    /*** ACTUALIZAR DETALLE PRODUCTO ***/
  update: (req, res) => {
    products.forEach(element => {

      if (element.id === parseInt(req.params.id)) {

        element.productName = req.body.productName

        // element.productName = req.body.productName.length ? == 0 ? element.productName : req.body.productName;
        // element.price = req.body.price > 0 ? parseInt(req.body.price) : element.price;
        // element.discount = req.body.discount > 0 ? parseInt(req.body.discount) : element.price;
        // element.description = req.body.description.length == 0 ? element.description : req.body.description;

      };

      fs.writeFileSync(productsFilePath, JSON.stringify(products));

    });

    res.redirect('/products');


  },

/*** DETALLE DE PRODUCTO ***/
  productDetail: (req, res) => {
    let productForDetail = products.find(element => { return element.id === parseInt(req.params.id) })

    res.render('product-detail', {
      productForDetail: productForDetail,

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