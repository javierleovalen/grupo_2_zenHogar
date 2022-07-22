const db = require("../../database/models");
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

const controller = {
  createUser: async function (req, res) {
    let validationsErrors = validationResult(req)

    if (!validationsErrors.isEmpty()) {
      return res.status(400).json({
        meta: {
          status: 400,
          msg: 'Bad request',
          route: req.url
        },
        errors: validationsErrors.mapped()
      });
    }

    try {
      await db.User.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
        profileImg: 'default.jpg'
      });

      delete req.body.password;

      return res.status(200).json({
        meta: {
          status: 201,
          msg: 'Ok',
          route: req.url,
        },
        data: {
          message: `The account was created successfully`,
          userData: req.body,
        }
      });

    } catch (error) {
      return res.status(500).json({
        meta: {
          status: 500,
          msg: 'Internal server error',
          route: req.url
        },
        data: {
          msg: 'Please send this report below to flgorordo@gmail.com, thanks you',
          errorName: error.name,
          code: error.original.code,
          errorno: error.original.errno,
          detail: error,
        }
      });
    }
  },

  loginUser: async function (req, res) {
    let validationsErrors = validationResult(req);

    if (!validationsErrors.isEmpty()) {
      return res.status(400).json({
        meta: {
          status: 400,
          msg: 'Bad request',
          route: req.url
        },
        errors: validationsErrors.mapped()
      });
    }

    try {
      let userToLogin = await db.User.findOne({ where: {email: req.body.email}})
      if (bcrypt.compareSync(req.body.password, userToLogin.dataValues.password)) {
        delete userToLogin.dataValues.password
        return res.status(200).json({
          meta: {
            status: 200,
            msg: 'Ok',
            route: req.url
          },
          data: {
            ...userToLogin.dataValues
          }
        });
      } else {
        return res.status(400).json({
          meta: {
            status: 400,
            msg: 'Bad request',
            route: req.url
          },
          data: {
            msg: 'Las contaseña ingresada no es válida, intente nuevamente  '
          }
        });
      }

    } catch (error) {
      return res.status(500).json({
        meta: {
          status: 500,
          msg: 'Internal server error',
          route: req.url
        },
        data: {
          msg: 'Please send this report below to flgorordo@gmail.com, thanks you',
          errorName: error.name,
          code: error.original.code,
          errorno: error.original.errno,
          detail: error,
        }
      });
    }

  },
  editUserInfo: async function (req, res) {
    let userId = parseInt(req.params.id);
    try {
      let oldData = await db.User.findOne({ where: { id: userId} });
      delete oldData.dataValues.password;
      let updatedData = {
        ...oldData.dataValues,
        ...req.body
      }
      await db.Usuarios.update(updatedData, { where: { id: userId } })
      return res.status(200).json({
        meta: {
          status: 200,
          msg: 'Updated data',
          route: req.url
        },
        data: updatedData,
      })
    } catch (error) {
      return res.status(500).json({
        meta: {
          status: 500,
          msg: 'Internal server error',
          route: req.url
        },
        data: {
          msg: 'Please send this report below to flgorordo@gmail.com, thanks you',
          errorName: error.name,
          code: error.original.code,
          errorno: error.original.errno,
          detail: error,
        }
      });
    }
  },
  deleteUser: async function(req, res) {
    let id = parseInt(req.params.id);
    try{
      await db.User.destroy({where: {id: id}})
      return res.status(200).json({
        meta: {
          status: 200,
          msg:'Ok',
          route: req.url
        }
      })
    }catch(error) {
      return res.status(500).json({
        meta: {
          status: 500,
          msg: 'Internal server error',
          route: req.url
        },
        data: {
          msg: 'Please send this report below to flgorordo@gmail.com, thanks you',
          errorName: error.name,
          code: error.original.code,
          errorno: error.original.errno,
          detail: error,
        }
      });
    }
  },
  listUsers: async function (req,res) {
    try {
      let allUsers = await db.User.findAll({include: ['accountCart']})
      let cleanData = [];
      allUsers.forEach(user => {
        cleanData.push(user.toJSON())
      })

      return res.status(200).json({
        meta:{
          status:200,
          msg: 'ok',
          route: req.url
        },
        data: cleanData
      })




    }catch(error) {
      return res.json({error})
    }
  },
  createProduct: async function(req, res) {
    try {
      let 
    } catch(error) {

    }
  }
}

module.exports = controller;