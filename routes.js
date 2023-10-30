const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middleware');

route.get('/', homeController.index);

route.get('/login', loginController.index);
route.post('/login/in', loginController.login);
route.get('/register', registerController.index);
route.post('/register/registed', registerController.register);
route.get('/logout', loginController.logout);

route.get('/contact', loginRequired, contactController.index);
route.get('/contact/register', loginRequired, contactController.register);

module.exports = route;