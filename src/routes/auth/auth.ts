import { Router } from 'express';
const router = Router();
import ResponseHelper from '../../helper/responseHelper';
import verifiTokenMiddleWares from '../../middlewares/verifyToken.middlewares';
import AuthHandler from '../../core/auth/auth.handler';

router.post('/login', async (req, res) => {
    try {
        const result = await AuthHandler.login(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

// TODO: Encrypt Password By Bcrypt. Active account
router.post('/register', async (req, res) => {
    try {
        const result = await AuthHandler.registerUser(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

router.post('/logout', verifiTokenMiddleWares, async (req, res) => {
    try {
        const result = await AuthHandler.logout(req);
        ResponseHelper.sendResponse(res, result);
    } catch (err) {
        ResponseHelper.sendError(res, err.message);
    }
});

export default router;