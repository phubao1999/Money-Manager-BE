import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import constant from "../constant/constant";
import authHandler from "../core/auth/auth.handler";
import JwtHelper from "../helper/jwtHelper";
import ResponseHelper from "../helper/responseHelper";
import util from "../util/util";
import message from "../messages/message.json";

const verifiTokenMiddleWares = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get header value
  const bearerHeader = req.headers[constant.REQUEST_HEADER_TOKEN]?.toString();
  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1];
    if (token === null) {
      return ResponseHelper.sendError(res, "Unauthorized", 401);
    } else {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET as string,
        (err: any, user) => {
          if (err) {
            if (err.expiredAt) {
              return refreshToken(token, req)
                .then((result) => {
                  const objResponse = {
                    msg: message.refreshTokenMsg.success,
                    status: 201,
                  };
                  return ResponseHelper.sendResponse(res, result, objResponse);
                })
                .catch((errorr) => {
                  return ResponseHelper.sendError(res, errorr.message, 403);
                });
            }
            return ResponseHelper.sendError(res, err.message, 403);
          }
          req.body.user = user;
          next();
        }
      );
    }
  } else {
    return ResponseHelper.sendError(res, "Unauthorized", 401);
  }
};

const refreshToken = (token: String, request: Request) => {
  return new Promise((resolve, reject) => {
    if (!request.headers[constant.REQUEST_REFRESH_HEADER_TOKEN]) {
      reject({ message: message.refreshTokenMsg.non_token });
    }
    const refeshToken = request.headers[constant.REQUEST_REFRESH_HEADER_TOKEN]
      .toString()
      .split(" ")[1];
    const tokenInfo = JwtHelper.getTokenInfo(token).configTokenInfo;
    authHandler.getUserById(tokenInfo._id).then((user) => {
      if (!user) {
        reject({ message: message.refreshTokenMsg.non_user });
      }
      if (user.refreshToken !== refeshToken) {
        reject({ message: message.refreshTokenMsg.invalid_token });
      }
      const refeshTokenExpiresAt = user.timeLogin + user.refreshTokenExpiresIn;
      if (util.getTimeStampNowAsTokenTime() > refeshTokenExpiresAt) {
        reject({ message: message.refreshTokenMsg.token_expires });
      }
      resolve(JwtHelper.generateFromRefeshToken(tokenInfo));
    });
  });
};

export default verifiTokenMiddleWares;
