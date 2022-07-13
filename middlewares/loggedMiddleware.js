const db = require('../database/models/index')

async function loggedMiddleware(req, res, next) {
  try {
    res.locals.isLogged = false;
    if (!req.session.userLogged && req.cookies.token) {
      let userToLogin = await db.Usuarios.findOne({ where: { email: req.cookies.token } })
      delete userToLogin.dataValues.password
      req.session.userLogged = userToLogin.dataValues
    }

    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged
    }

    next();
  } catch (errors) {
    console.log(errors)
  }
}

module.exports = loggedMiddleware;