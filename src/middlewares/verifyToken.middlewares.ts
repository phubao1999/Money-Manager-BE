import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import constant from '../constant/constant';
import ResponseHelper from '../helper/responseHelper';

const verifiTokenMiddleWares = (req: Request, res: Response, next: NextFunction) => {
    // Get header value
    const bearerHeader = req.headers[constant.REQUEST_HEADER_TOKEN]?.toString();
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        if (token === null) {
            return ResponseHelper.sendError(res, "Unauthorized", 401);
        } else {
            jwt.verify(token, (process.env.TOKEN_SECRET as string), (err: any, user) => {
                if (err) {
                    if (err.expiredAt) {
                        console.log("Refesh Token Code Here");
                    }
                    return ResponseHelper.sendError(res, err.message, 403);
                }
                req.body.user = user;
                next();
            });
        }
    } else {
        return ResponseHelper.sendError(res, "Unauthorized", 401);
    }
}

export default verifiTokenMiddleWares;