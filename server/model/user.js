const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email Id must required']
    },
    password: {
        type: String,
        required: [true, 'Password must required']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;