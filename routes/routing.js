const express = require('express');
const router = express.Router();
const post = require('./post/post');
const auth = require('./auth/auth');
const verifyToken = require('../middlewares/jsonWebToken');

router.use('/post', verifyToken, post);
router.use('/auth', auth);

module.exports = router;