const veryfiToken = (req, res, next) => {
    // Get header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Handle Forbiden
        res.sendStatus(403);
    }
}

module.exports = veryfiToken;