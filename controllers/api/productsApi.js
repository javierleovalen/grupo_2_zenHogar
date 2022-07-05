const db = require('../../database/models/index');

const controller = {
  list: async function(req,res) {
    try {
      let productos = await db.Productos.findAll({
        include: ['imagenes', 'categorias']
      })

      if (productos) {
        res.send(200).json()
      }
    } catch (e) {
      res.send(e)
    }
  }
};

module.exports = controller;