const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');

route.get('/', homeController.index);

route.get('/login', loginController.index);
route.post('/login/in', loginController.login);
route.get('/register', registerController.index);
route.post('/register/registed', registerController.register);

module.exports = route;