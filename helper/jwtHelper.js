const jwt = require('jsonwebtoken');
const util = require('../util/util');
require('dotenv/config');

const generateAccessToken = user => {
    const expiresIn = 60 * 60 * 24;
    const refeshTokenExpiresIn = 60 * 60 * 24 * 14; // 14 days
    const token = jwt.sign({
        user
    }, process.env.TOKEN_SECRET, { expiresIn });
    return tokenResponse = {
        user,
        token,
        expiresIn,
        timeLogin: util.getTimeStampNow(),
        refeshTokenExpiresIn
    }
}

module.exports = { generateAccessToken };