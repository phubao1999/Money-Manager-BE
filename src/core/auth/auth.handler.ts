const User = require('../../models/User');
const message = require('../../messages/message.json');
const util = require('../../util/util');
const jwtHelper = require('../../helper/jwtHelper');
const userResonse = require('../../models/response/User');

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
 * 
 * @param {*} user 
 * @returns Update User Token
 */
const updateUserToken = async user => {
    try {
        const tokenGen = await jwtHelper.generateAccessToken(user);
        const userTokenUpdate = await User.updateOne(
            { _id: user._id },
            {
                $set: {
                    token: tokenGen.token,
                    timeLogin: tokenGen.timeLogin,
                    expiresIn: tokenGen.expiresIn,
                    refreshToken: tokenGen.refreshToken,
                    refreshTokenExpiresIn: tokenGen.refreshTokenExpiresIn
                }
            }
        );

        return userTokenUpdate;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {*} userName 
 * @returns user
 */
const getUserByUserName = async userName => {
    try {
        const user = await User.findOne({ user_name: userName });
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
        password: util.gennerateAsMd5(req.body.password)
    });
    try {
        const userChecking = await getUserByEmail(user.email);

        if (userChecking) {
            throw message.authentication.duplicate_mail;
        };

        const userCheckingName = await getUserByUserName(user.user_name);

        if (userCheckingName) {
            throw message.authentication.duplicate_name;
        }

        const registerUser = await user.save();

        return registerUser;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {*} req 
 * @returns User Login Response
 */
const login = async req => {
    try {
        const user = await getUserByUserName(req.body.user_name);

        if (!user) {
            throw message.authentication.not_find_user_name;
        }

        if (!util.compareStringAsMd5(req.body.password, user.password)) {
            throw message.authentication.password_invalid;
        }

        await updateUserToken(user);

        return userResonse(user);

    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * TODO Revoke Token
 * 
 * @param {*} req 
 * @returns void
 */
const logout = async req => {
    try {
        const token = util.getTokenString(req);
        const tokenInfo = jwtHelper.getTokenInfo(token);
        await User.updateOne(
            { _id: tokenInfo.configTokenInfo._id },
            {
                $unset: {
                    token: "",
                    timeLogin: 0,
                    expiresIn: 0,
                    refreshToken: "",
                    refreshTokenExpiresIn: 0
                }
            }
        );

        return message.authentication.logout;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    registerUser,
    login,
    logout
};