const express = require('express');
const channelController = require('./../controller/channelController');
const authController = require('./../controller/authController');
const Router = express.Router();

Router.get('/:id', channelController.getChannel);

Router.use(authController.protect);

Router.get('/user/:id', channelController.getAllChannel);
Router.post('/', channelController.createChannel);
Router.delete('/:id', channelController.deleteChannel);

module.exports = Router;

