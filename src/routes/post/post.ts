import { Router } from 'express';
const router = Router();
const postHandle = require('../../core/post/post.handler');
import ResponseHelper from '../../helper/responseHelper';

router.get('/', async (req, res) => {
    try {
        let result;
        if (req.query.postId) {
            result = await postHandle.getPostById(req);
        } else {
            result = await postHandle.getAllPosts();
        }
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await postHandle.addingPost(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await postHandle.deletePost(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await postHandle.updatePost(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

export default router;