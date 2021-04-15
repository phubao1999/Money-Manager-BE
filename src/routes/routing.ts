import { Router } from 'express';
const router = Router();
import auth from './auth/auth';
import post from './post/post';
import verifiTokenMiddleWares from '../middlewares/verifyToken.middlewares';

export default function routing() {
    router.use('/auth', auth);
    router.use('/post', verifiTokenMiddleWares, post);
}