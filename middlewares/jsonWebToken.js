const jwt = require('jsonwebtoken');

const veryfiToken = (req, res, next) => {
    // Get header value
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        if (token === null) {
            return res.sendStatus(401)
        } else {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
            });
        }
    } else {
        return res.sendStatus(401);
    }
}

module.exports = veryfiToken;