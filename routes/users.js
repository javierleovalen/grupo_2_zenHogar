const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const multer = require('multer');
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const loginCheckMiddleware = require('../middlewares/loginCheckMiddleware')

/* Multer Settings */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/uploads/users');
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id + '-userAvatar.jpg');
  },
});

/* Multer Env */
const upload = multer({ storage });


/* Login */
router.get('/login', guestMiddleware, UsersController.login);
router.post('/login', UsersController.loginValidation);

/* Logout */
router.get('/logout', UsersController.logout)
/* Register */
router.get('/register',guestMiddleware ,UsersController.register);
router.post('/register', UsersController.create);

/* Profile */
router.get('/profile/', loginCheckMiddleware, UsersController.profile);

/* Profile: edit info */
router.get('/profile/edit/:id',loginCheckMiddleware, UsersController.editInfo)
router.put('/profile/update/:id',upload.single('avatarImg'), UsersController.updateProfile)


router.get('/logout', UsersController.logout);


module.exports = router;