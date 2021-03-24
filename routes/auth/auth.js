const express = require('express');
const router = express.Router();
const jwtHelper = require('../../helper/jwtHelper');

router.post('/login', (req, res) => {
    // Mock User
    const user = {
        id: 1,
        username: 'baopt',
        email: 'phutuongbao1999@gmail.com'
    }
    res.json({ token: jwtHelper.generateAccessToken(user) });
});

module.exports = router;