const express = require('express');
const UserController = require('./../controller/userController');

const Router = express.Router();

Router.post('/register', UserController.createUser);

module.exports = Router;
