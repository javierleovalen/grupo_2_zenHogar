

const MainController = {

    home: (req, res) => {
        const styles = ['normalize', 'home']
        const titulo = 'Zen Hogar'
        res.render('home', {
            styles: styles,
            titulo: titulo,
            products: products,
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