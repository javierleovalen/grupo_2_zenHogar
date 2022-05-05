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