const MainController = {

    index: (req,res) => {

        res.render('new_home');
    },

    login: (req,res) => {

        res.render('new_login');
    },

}




module.exports = MainController;