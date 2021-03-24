const express = require('express');
const router = express.Router();
const postHandle = require('../../core/post/post.handler');
const resHelper = require('../../helper/responseHelper');

router.get('/', async (req, res) => {
    try {
        let result;
        if (req.query.postId) {
            result = await postHandle.getPostById(req);
        } else {
            result = await postHandle.getAllPosts();
        }
        resHelper.sendResponse(res, result);
    } catch (err) {
        resHelper.sendError(res, err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await postHandle.addingPost(req);
        resHelper.sendResponse(res, result);
    } catch (err) {
        resHelper.sendError(res, err.message);
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await postHandle.deletePost(req);
        resHelper.sendResponse(res, result);
    } catch (err) {
        resHelper.sendError(res, err.message);
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await postHandle.updatePost(req);
        resHelper.sendResponse(res, result);
    } catch (err) {
        resHelper.sendError(res, err.message);
    }
});

module.exports = router;