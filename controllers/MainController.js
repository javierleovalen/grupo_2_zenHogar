const MainController = {

    home: (req,res) => {
        const styles = ['normalize', 'home']
        const titulo = 'Zen Hogar'
        res.render('home', {
            styles:styles,
            titulo:titulo,
        });
    },

    login: (req,res) => {
        const styles = ['normalize', 'login'];
        const titulo = 'Zen Hogar | Login'
        res.render('login');
    },

    register: (req,res) => {
        const styles = ['normalize', 'home','register']
        const titulo = 'registro'
        res.render('register', {
            styles:styles,
            titulo:titulo,
        });
    },


    test: (req,res) => {
        const styles = ['normalize', 'home']
        const titulo = 'Titulo de prueba'
        res.render('vista_de_prueba',{
            styles: styles,
            titulo: titulo,
        })
    },
    productDetail: (req, res) => {
        const styles = ['normalize','product-detial']
        const titulo = 'Placeholder: Nombre del producto'
        res.render('product-detial', {
            styles: styles,
            titulo: titulo,
        })
    }
}




module.exports = MainController;