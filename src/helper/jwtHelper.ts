import jwt from 'jsonwebtoken';
import util from '../util/util';
require('dotenv/config');

export default class JwtHelper {

    public static generateAccessToken = (user: any) => {
        const expiresIn = 60 * 60;
        const refreshTokenExpiresIn = 60 * 60 * 24 * 3; // 3 days
        const configTokenInfo = {
            _id: user._id.toString(),
            email: user.email,
            user_name: user.user_name
        }
        const token = jwt.sign({
            configTokenInfo
        }, (process.env.TOKEN_SECRET as string), { expiresIn });
        const refreshToken = jwt.sign({
            configTokenInfo
        }, (process.env.REFRESH_TOKEN_SECRET as string), { expiresIn: refreshTokenExpiresIn });

        return {
            user: user,
            token,
            timeLogin: util.getTimeStampNowAsTokenTime(),
            expiresIn,
            refreshTokenExpiresIn,
            refreshToken
        }
    };

    public static getTokenInfo = (token: any) => {
        return jwt.decode(token);
    }

}