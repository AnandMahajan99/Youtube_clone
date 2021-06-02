const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Video title must required'],
        minlenght: [5, 'Title must have minimum 5 characters'],
        maxlenght: [40, 'Title must have characters less than 40']
    },
    thumbnail: {
        type: String,
        // required: [true, 'Video image must required']
    },
    video: {
        type: String
    },
    duration: {
        type: Number
    },
    description: {
        type: String,
        required: [true, 'Video Description must required']
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
    uploadOn: {
        type: Date,
        default: Date.now
    },
    viewCount:{
        type: Number,
        default: 0
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;