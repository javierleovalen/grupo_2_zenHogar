const express = require ('express');
const router = express.Router();
const MainController = require ('../controllers/MainController');


// HOME //
router.get('/', MainController.home);



module.exports = router;