const express = require('express');
const router = express.Router();
const postHandle = require('../../core/post/post.handler');

router.get('/', async (req, res) => {
    try {
        let result;
        if (req.query.postId) {
            result = await postHandle.getPostById(req);
        } else {
            result = await postHandle.getAllPosts();
        }
        res.json({ data: result });
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await postHandle.addingPost(req);
        res.json({ data: result });
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await postHandle.deletePost(req);
        res.json({ data: result });
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await postHandle.updatePost(req);
        res.json({ data: result });
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;