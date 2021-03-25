const express = require('express');
const router = express.Router();
const jwtHelper = require('../../helper/jwtHelper');
const resHelper = require('../../helper/responseHelper');
const verifyToken = require('../../middlewares/jsonWebToken');
const util = require('../../util/util');

router.post('/login', (req, res) => {
    // Mock User
    const user = {
        id: 1,
        username: 'baopt',
        email: 'phutuongbao1999@gmail.com'
    }
    resHelper.sendResponse(res, jwtHelper.generateAccessToken(user));
});

router.get('/logout', verifyToken, (req, res) => {
    // req.user.deleteToken(util.getTokenString(req.headers.authorization), (err, user) => {
    //     if (err) {
    //         resHelper.sendError(res, err.message);
    //     } else {
    //         resHelper.sendResponse(res, user);
    //     }
    // });
});

module.exports = router;