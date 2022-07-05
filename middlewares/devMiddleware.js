function devMiddleware(req,res,next) {
  if (req.session.userLogged && req.session.userLogged.isDev === true) {
    next()
  }
  res.send('No tienes permisos')
}
module.exports = devMiddleware;