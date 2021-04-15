import { Router } from 'express';
const router = Router();
import ResponseHelper from '../../helper/responseHelper';
import PostHandler from '../../core/post/post.handler';

router.get('/', async (req, res) => {
    try {
        let result;
        if (req.query.postId) {
            result = await PostHandler.getPostById(req);
        } else {
            result = await PostHandler.getAllPosts();
        }
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await PostHandler.addingPost(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await PostHandler.deletePost(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await PostHandler.updatePost(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

export default router;