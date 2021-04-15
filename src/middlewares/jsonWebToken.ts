import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const resHelper = require('../helper/responseHelper');

const veryfiToken = (req: Request, res: Response, next: NextFunction) => {
    // Get header value
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        if (token === null) {
            return resHelper.sendError(res, "Unauthorized", 401);
        } else {
            jwt.verify(token, (process.env.TOKEN_SECRET as string), (err, user) => {
                if (err) return resHelper.sendError(res, err, 403);
                req.body.user = user;
                next();
            });
        }
    } else {
        return resHelper.sendError(res, "Unauthorized", 401);
    }
}

export default veryfiToken;