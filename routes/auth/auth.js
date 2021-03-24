const express = require('express');
const router = express.Router();
const jwtHelper = require('../../helper/jwtHelper');
const resHelper = require('../../helper/responseHelper');

router.post('/login', (req, res) => {
    // Mock User
    const user = {
        id: 1,
        username: 'baopt',
        email: 'phutuongbao1999@gmail.com'
    }
    resHelper.sendResponse(res, jwtHelper.generateAccessToken(user));
});

module.exports = router;