const db = require('../../database/models/index')

const controller = {
  products: async function (req, res) {
    try {
      let products = await db.Productos.findAll({
        include: ['imagenes', 'categoria']
      })
      if (products) {
        return res.status(200).json({
          meta: {
            status: 200,
            total: products.length,
            url: '/api/products'
          },
          data: products
        })
      } else {
        return res.status(204).json({
          meta: {
            status: 204,
            msg: 'No-content',
            url: '/api/products'
          }
        })
      }
    } catch (errors) {
      return res.json({errors})
    };
  },
  categories: async function (req, res) {
    try {
      let categories = await db.Categorias.findAll()
      if (categories) {
        return res.status(200).json({
          meta: {
            status: 200,
            total: categories.length,
            url: '/api'
          },
          data: categories
        })
      } else {
        return res.status(204).json({
          meta: {
            status: 204,
            msg: 'No-content',
            url: '/api'
          }
        })
      }
    } catch (errors) {
      return res.json({errors})
    };
  },
  users: async function (req, res) {
    try {
      let usuarios = await db.Usuarios.findAll({
        include: ['carrito']
      })
      if (usuarios) {
        return res.status(200).json({
          meta: {
            status: 200,
            total: usuarios.length,
            url: '/api'
          },
          data: usuarios
        })
      } else {
        return res.status(204).json({
          meta: {
            status: 204,
            msg: 'No-content',
            url: '/api'
          }
        })
      }
    } catch (errors) {
      return res.json({errors})
    };
  },
  img: async function (req, res) {
    try {
      let images = await db.Fotos.findAll({
      })
      if (images) {
        return res.status(200).json({
          meta: {
            status: 200,
            total: images.length,
            url: '/api'
          },
          data: images
        })
      } else {
        return res.status(204).json({
          meta: {
            status: 204,
            msg: 'No-content',
            url: '/api'
          }
        })
      }
    } catch (errors) {
      return res.json({errors})
    };
  },
  roles: async function (req, res) {
    try {
      let roles = await db.Roles.findAll({
      })
      if (roles) {
        return res.status(200).json({
          meta: {
            status: 200,
            total: roles.length,
            url: '/api'
          },
          data: roles
        })
      } else {
        return res.status(204).json({
          meta: {
            status: 204,
            msg: 'No-content',
            url: '/api'
          }
        })
      }
    } catch (errors) {
      return res.json({errors})
    };
  },
  carts: async function (req, res) {
    try {
      let carts = await db.Carritos.findAll({
        include: ['producto'],
        raw:true,
        nest: true,
      })
      if (carts) {
        return res.status(200).json({
          meta: {
            status: 200,
            total: carts.length,
            url: '/api'
          },
          data: carts
        })
      } else {
        return res.status(204).json({
          meta: {
            status: 204,
            msg: 'No-content',
            url: '/api'
          }
        })
      }
    } catch (errors) {
      return res.json({errors})
    };
  },
}

module.exports = controller;