const mongoose = require('mongoose');
const message = require('../messages/message.json');

const emailValidate = email => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
};

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        validate: [emailValidate, message.validateMessage.email]
    },
    user_name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    status_active: {
        type: Number,
        default: 0
    },
    timeLogin: {
        type: Number,
        timeLogin: 0
    },
    refreshToken: {
        type: String,
        default: ""
    },
    refreshTokenExpiresIn: {
        type: Number,
        timeLogin: 0
    }
});

module.exports = mongoose.model('User', UserSchema);