const fs = require('fs');
const path = require('path');
const promoProductsFilePath = path.join(__dirname, '../data/products/promoProducts.json');
let promoProducts = JSON.parse(fs.readFileSync(promoProductsFilePath, 'utf-8'));

const MainController = {

    home: (req, res) => {
        res.render('home', {
            promoProducts: promoProducts
        });
    },

    login: (req, res) => {
        const styles = ['normalize', 'home', 'login'];
        const titulo = 'Zen Hogar | Login'
        res.render('login', {
            styles: styles,
            titulo: titulo,
        });
    },

    register: (req, res) => {
        const styles = ['normalize', 'home', 'register']
        const titulo = 'Zen Hogar | Registro'
        res.render('register', {
            styles: styles,
            titulo: titulo,
        });
    },

    test: (req, res) => {
        const styles = ['normalize', 'home']
        const titulo = 'Titulo de prueba'
        res.render('vista_de_prueba', {
            styles: styles,
            titulo: titulo,
        })
    },

  

}



module.exports = MainController;