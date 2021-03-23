const jwt = require('jsonwebtoken');

const generateAccessToken = user => {
    return jwt.sign(user, 'tokenSecret', { expiresIn: '1800s' });
}

module.exports = { generateAccessToken };