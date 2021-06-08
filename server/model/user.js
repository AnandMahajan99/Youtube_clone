const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email Id must required'],
        unique: [true, "User with this email already exist"],
        // validate: [validator.isEmail, 'Please enter valid email id'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password must required']
    }
});


// pre Middleware runs when save method is called (Hashing password) 
userSchema.pre('save', async function(next) {
    // Only run this if password is modified
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;