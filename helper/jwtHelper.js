const jwt = require('jsonwebtoken');
const util = require('../util/util');
require('dotenv/config');

const generateAccessToken = user => {
    const expiresIn = 60 * 60;
    const refreshTokenExpiresIn = 60 * 60 * 24 * 3; // 3 days
    const token = jwt.sign({
        user
    }, process.env.TOKEN_SECRET, { expiresIn });
    const refreshToken = jwt.sign({
        user
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiresIn });
    return tokenResponse = {
        user: user,
        token,
        timeLogin: util.getTimeStampNow(),
        expiresIn,
        refreshTokenExpiresIn,
        refreshToken
    }
}

module.exports = { generateAccessToken };