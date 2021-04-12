const jwt = require('jsonwebtoken');
const util = require('../util/util');
require('dotenv/config');

const generateAccessToken = user => {
    const expiresIn = 60 * 60;
    const refreshTokenExpiresIn = 60 * 60 * 24 * 3; // 3 days
    const configTokenInfo = {
        _id: user._id.toString(),
        email: user.email,
        user_name: user.user_name
    }
    const token = jwt.sign({
        configTokenInfo
    }, process.env.TOKEN_SECRET, { expiresIn });
    const refreshToken = jwt.sign({
        configTokenInfo
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiresIn });
    return tokenResponse = {
        user: user,
        token,
        timeLogin: util.getTimeStampNowAsTokenTime(),
        expiresIn,
        refreshTokenExpiresIn,
        refreshToken
    }
}

const getTokenInfo = token => {
    return jwt.decode(token);
}

module.exports = {
    generateAccessToken,
    getTokenInfo
};