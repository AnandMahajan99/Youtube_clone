const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Channel name must required']
    },
    description: {
        type: String,
        required: [true, 'Description must required'],
    },
    // createdBy
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "A channel must have a user"]
    },
    image: String
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;