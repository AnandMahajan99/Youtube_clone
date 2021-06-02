const express = require('express');
const AuthController = require('./../controller/authController');

const Router = express.Router();

Router.post('/login', AuthController.login);
Router.post('/logout', AuthController.logout);

module.exports = Router;
