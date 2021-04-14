const constant = require('../../constant/constant');

const userResonse = user => {
    return {
        user_name: user.user_name,
        token: user.token,
        expiresIn: user.expiresIn,
        timeLogin: user.timeLogin,
        refreshToken: user.refreshToken,
        refreshTokenExpiresIn: user.refreshTokenExpiresIn,
        tokenType: constant.tokenType
    }
};

module.exports = userResonse;