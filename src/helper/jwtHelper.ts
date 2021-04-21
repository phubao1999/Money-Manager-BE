import jwt from "jsonwebtoken";
import * as env from "../environments/enviroments";
import util from "../util/util";

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
      env.environment.TOKEN_SECRET,
      { expiresIn }
    );
    const refreshToken = jwt.sign(
      {
        configTokenInfo,
      },
      env.environment.REFRESH_TOKEN_SECRET,
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
      env.environment.TOKEN_SECRET,
      { expiresIn }
    );
  }

  public static getTokenInfo = (token: any): any => {
    return jwt.decode(token);
  };
}
