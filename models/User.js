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
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', UserSchema);