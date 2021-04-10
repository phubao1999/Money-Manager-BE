const User = require('../../models/User');
const message = require('../../messages/message.json');

/**
 * @param {*} email 
 * @returns user
 */
const getUserByEmail = async email => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Register User
 * @param {*} req 
 * @returns user
 */
const registerUser = async req => {
    const user = new User({
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password
    });
    try {
        const userChecking = await getUserByEmail(req.body.email);
        if (userChecking) {
            throw message.authentication.duplicate_mail
        };
        const registerUser = await user.save();
        return registerUser;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    registerUser
};