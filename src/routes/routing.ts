import * as express from "express";
import authRouter from './auth/auth';
import post from './post/post';
import verifiTokenMiddleWares from '../middlewares/verifyToken.middlewares';

let router = express.Router();

router.use('/auth', authRouter);
router.use('/post', verifiTokenMiddleWares, post);

export default router;