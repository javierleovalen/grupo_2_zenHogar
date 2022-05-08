const products = [
    {
        "id":"001",
        "name":"Sillon living comedor Verde",
        "price": 85000,
        "img": "/img/sillon_verde1.jpg",
        "discount":40,
    },
    {
        "id":"002",
        "name":"Sillon exterior de jarin",
        "price": 75000,
        "img": "/img/2019570.5.jpg",
        "discount":30,

    },
    {
        "id":"003",
        "name":"Silla Marron de jardin",
        "price": 55000,
        "img": "/img/2019907.1.jpg",
        "discount":20

    }
]



const MainController = {

    home: (req,res) => {
        const styles = ['normalize', 'home']
        const titulo = 'Zen Hogar'
        res.render('home', {
            styles:styles,
            titulo:titulo,
            products:products,
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

    create: (req,res) => {
        const styles = ['normalize', 'home', 'create']
        const titulo = 'Zen Hogar | Crear Producto'
        res.render('create', {
            styles:styles,
            titulo:titulo,
        });
    },

    cart: (req,res) => {
        const styles = ['normalize','home', 'cart']
        const titulo = 'Zen Hogar | Mi Carrito'
        res.render('cart', {
            styles:styles,
            titulo:titulo,
            products:products,
        });
    },

    productDetail: (req,res) => {
        const item = products.find(item=> {
            return item.id === req.params.item;

        });
        const styles = ['normalize','home', 'product-detail']
        const titulo = 'Zen Hogar | Detalle del Producto'
        res.render('product-detail', {
            styles:styles,
            titulo:titulo,
            item:item,
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
   
}



module.exports = MainController;