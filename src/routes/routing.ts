import { Router } from 'express';
const router = Router();
import auth from './auth/auth';
import post from './post/post';
import verifyToken from '../middlewares/jsonWebToken';

export default function routing() {
    router.use('/auth', auth);
    router.use('/post', verifyToken, post);
}