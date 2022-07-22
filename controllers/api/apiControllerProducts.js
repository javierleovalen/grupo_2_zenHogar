const { matchedData,validationResult } = require("express-validator");
const db = require("../../database/models");

const Controller = {
  create: async (req, res) => {
    try {
      let validationErrors = validationResult(req)
      const body = matchedData(req);

      if(!validationErrors.isEmpty()) {
        return res.status(200).json({
          msg: 'Errores de validación, revise debajo de este mensaje',
          errors: validationErrors.mapped()
        })
      }

      db.Product.create({
        ...body,
        createdBy: parseInt(body.createdBy),
        price: parseFloat(body.price),
        stock: parseInt(body.stock),
      })
      .then(data => {
        console.log(data.toJSON())
        res.status(200).json({
          msg: 'All ok',
          data
        })
      })
    } catch (error) {
      console.log(error)
    }
  },
  update: (req, res) => {

  },
  delete: (req, res) => {

  },
  listAll: async (req, res) => {
    try{
      let allProducts = await db.Product.findAll({include: ['Category']})
      let cleanData = [];
      allProducts.forEach(product => {
        cleanData.push(product.toJSON())
      })
      return res.status(200).json({
        meta: {
          status:200,
          msg: 'ok',
          route: req.url
        },
        data: cleanData
      })
    } catch (error) {
      console.log(error)
    }
  },
  listOne: (req, res) => {

  },
}

module.exports = Controller;