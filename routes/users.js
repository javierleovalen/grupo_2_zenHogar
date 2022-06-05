const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const multer = require('multer');
const path = require('path');
const loginValidation = require('../middlewares/loginValidations');
const validations = require ('../middlewares/registerValidations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/* Multer Settings */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/uploads/users/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-userImg' + path.extname(file.originalname));
  },
});

/* Multer Env */
const upload = multer({ storage });


/* Login */
router.get('/login',guestMiddleware, UsersController.login);
router.post('/login', UsersController.loginValidation);

/* Logout */
router.get('/logout', UsersController.logout)
/* Register */
router.get('/register',guestMiddleware, UsersController.register);
router.post('/register', upload.single('avatar'), validations, UsersController.create);
router.get('/register/success', UsersController.registerSuccessful);

/* Profile */
router.get('/profile/', authMiddleware, UsersController.profile);

/* Editar perfil (work in progress) */
router.put('/profile/:id', upload.single('avatar'), UsersController.profileUpdate);

module.exports = router;