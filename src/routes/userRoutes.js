const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const upload = require('../middlewares/usersMulter');
const guestMiddleware = require('../middlewares/guestMiddleware');
const validations = require('../middlewares/userValidations');

//?     ****** Rutas de registro de usuarios ******
router.get('/register', guestMiddleware, usersController.registerView);
router.post('/register', upload.single('avatar'), validations, usersController.createNewUser);

//?     ****** Rutas de Login   ******
router.get('/login', guestMiddleware, usersController.loginView);
router.post('/login', usersController.logUser);

//?     ****** Ruta de logout   ******
router.get('/logout/', usersController.logout);


module.exports = router;