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
        const styles = ['normalize', 'home', 'login'];
        const titulo = 'Zen Hogar | Login'
        res.render('login', {
        styles:styles,
        titulo:titulo,
        });
    },

    register: (req,res) => {
        const styles = ['normalize', 'home','register']
        const titulo = 'Zen Hogar | Registro'
        res.render('register', {
            styles:styles,
            titulo:titulo,
        });
    },

    createProduct: (req,res) => {
        const styles = ['normalize', 'home','register', 'createProduct']
        const titulo = 'Zen Hogar | Crear Producto'
        res.render('createProduct', {
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
<<<<<<< HEAD



    


=======
    productDetail: (req, res) => {
        const styles = ['normalize','product-detial']
        const titulo = 'Placeholder: Nombre del producto'
        res.render('product-detial', {
            styles: styles,
            titulo: titulo,
        })
    },
    modifyProduct: (req,res) => {
        const styles=['normalize','modify-product','partials/header','partials/footer']
        const titulo= 'Modificar : Placeholder nombre de producto'
        res.render('modify-product', {
            styles:styles,
            titulo:titulo,
        })
    }
>>>>>>> e32b085536841face78b3171c72c99dbb9e3093a
}




module.exports = MainController;