const express = require('express');
const router = express.Router();
const authHandler = require('../../core/auth/auth.handler');
const resHelper = require('../../helper/responseHelper');

router.post('/login', async (req, res) => {
    try {
        const result = await authHandler.login(req);
        resHelper.sendResponse(res, result);
    } catch (err) {
        resHelper.sendError(res, err.message);
    }
});

// TODO: Encrypt Password By Bcrypt. Active account
router.post('/register', async (req, res) => {
    try {
        const result = await authHandler.registerUser(req);
        resHelper.sendResponse(res, result);
    } catch (err) {
        resHelper.sendError(res, err.message);
    }
});

module.exports = router;