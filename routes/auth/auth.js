const express = require('express');
const router = express.Router();
const authHandler = require('../../core/auth/auth.handler');
const jwtHelper = require('../../helper/jwtHelper');
const resHelper = require('../../helper/responseHelper');
const verifyToken = require('../../middlewares/jsonWebToken');
const util = require('../../util/util');

router.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'baopt',
        email: 'phutuongbao1999@gmail.com'
    }
    resHelper.sendResponse(res, jwtHelper.generateAccessToken(user));
});

// TODO: Encrypt Password. Active account
router.post('/register', async (req, res) => {
    try {
        const result = await authHandler.registerUser(req);
        resHelper.sendResponse(res, result);
    } catch (err) {
        resHelper.sendError(res, err.message);
    }
});

module.exports = router;