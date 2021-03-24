const jwt = require('jsonwebtoken');
const resHelper = require('../helper/responseHelper');

const veryfiToken = (req, res, next) => {
    // Get header value
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        if (token === null) {
            return resHelper.sendError(res, "Unauthorized", 401);
        } else {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                if (err) return resHelper.sendError(res, err, 403);
                req.user = user;
                next();
            });
        }
    } else {
        return resHelper.sendError(res, "Unauthorized", 401);
    }
}

module.exports = veryfiToken;