const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Channel name must required']
    },
    description: {
        type: String,
        required: [true, 'Description must required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: String
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;