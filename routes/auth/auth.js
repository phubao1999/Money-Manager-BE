const express = require('express');
const router = express.Router();
const jwtUtil = require('../../util/jwtUtil');

router.post('/login', (req, res) => {
    // Mock User
    const user = {
        id: 1,
        username: 'baopt',
        email: 'phutuongbao1999@gmail.com'
    }
    res.json({ token: jwtUtil.generateAccessToken(user) });
});

module.exports = router;