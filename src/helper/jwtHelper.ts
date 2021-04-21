import jwt from "jsonwebtoken";
import constant from "../constant/constant";
import util from "../util/util";
import * as env from "../environments/enviroments";
require("dotenv/config");

export default class JwtHelper {
  public static generateAccessToken = (user: any) => {
    const expiresIn = env.environment.expires_In;
    const refreshTokenExpiresIn = env.environment.refreshTokenExpiresIn;
    const configTokenInfo = {
      _id: user._id.toString(),
      email: user.email,
      user_name: user.user_name,
    };
    const token = jwt.sign(
      {
        configTokenInfo,
      },
      process.env.TOKEN_SECRET as string,
      { expiresIn }
    );
    const refreshToken = jwt.sign(
      {
        configTokenInfo,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: refreshTokenExpiresIn }
    );

    return {
      user: user,
      token,
      timeLogin: util.getTimeStampNowAsTokenTime(),
      expiresIn,
      refreshTokenExpiresIn,
      refreshToken,
    };
  };

  public static generateFromRefeshToken(tokenInfo: any) {
    const expiresIn = env.environment.expires_In;
    return jwt.sign(
      {
        tokenInfo,
      },
      process.env.TOKEN_SECRET as string,
      { expiresIn }
    );
  }

  public static getTokenInfo = (token: any): any => {
    return jwt.decode(token);
  };
}
