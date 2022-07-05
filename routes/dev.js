const express = require ('express');
const router = express.Router();
const devController = require('../controllers/devController')


router.get('/', devController.index)
router.get('/home', devController.home)

module.exports = router