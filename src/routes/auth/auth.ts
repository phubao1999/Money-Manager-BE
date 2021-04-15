import { Router } from 'express';
const router = Router();
import ResponseHelper from '../../helper/responseHelper';
const authHandler = require('../../core/auth/auth.handler');
import verifiTokenMiddleWares from '../../middlewares/verifyToken.middlewares';

router.post('/login', async (req, res) => {
    try {
        const result = await authHandler.login(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

// TODO: Encrypt Password By Bcrypt. Active account
router.post('/register', async (req, res) => {
    try {
        const result = await authHandler.registerUser(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

router.post('/logout', verifiTokenMiddleWares, async (req, res) => {
    try {
        const result = await authHandler.logout(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

export default router;