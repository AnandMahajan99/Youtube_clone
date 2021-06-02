const express = require('express');
const VideoController = require('./../controller/videoController');
const authController = require('./../controller/authController');

const Router = express.Router();

Router.get('/', VideoController.getAllVideos);
Router.get('/:id', VideoController.getVideo);
Router.get('/stream/:id', VideoController.streamVideo);
Router.get('/channel/:id', VideoController.getAllVideosOfChannel)

Router.use(authController.protect);

Router.post('/upload', VideoController.uploadVideo, VideoController.createVideo);
Router.delete('/:id', VideoController.deleteVideo);
// Router.post('/', VideoController.createVideo);
// Router.post('/upload', VideoController.uploadVideo);

module.exports = Router;