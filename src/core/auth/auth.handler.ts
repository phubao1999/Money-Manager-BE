import { Request } from 'express';
import userResonse from '../../models/response/User';
import UserSchema from '../../models/User.Schema';
import message from '../../messages/message.json';
import util from '../../util/util';
import JwtHelper from '../../helper/jwtHelper';


/**
 * @param {*} email 
 * @returns user
 */
const getUserByEmail = async (email: string) => {
    try {
        const user = await UserSchema.findOne({ email });
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @param {*} id 
 * @returns user
 */
 const getUserById = async (id: string) => {
    try {
        const user = await UserSchema.findOne({ _id: id });
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {*} user 
 * @returns Update User Token
 */
const updateUserToken = async (user: any) => {
    try {
        const tokenGen = await JwtHelper.generateAccessToken(user);
        const tokenConfig = {
            token: tokenGen.token,
            timeLogin: tokenGen.timeLogin,
            expiresIn: tokenGen.expiresIn,
            refreshToken: tokenGen.refreshToken,
            refreshTokenExpiresIn: tokenGen.refreshTokenExpiresIn
        }
        await UserSchema.updateOne(
            { _id: user._id },
            {
                $set: tokenConfig
            }
        );

        return tokenConfig;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * 
 * @param {*} userName 
 * @returns user
 */
const getUserByUserName = async (userName: string) => {
    try {
        const user = await UserSchema.findOne({ user_name: userName });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Register User
 * @param {*} req 
 * @returns user
 */
const registerUser = async (req: Request) => {
    const user = new UserSchema({
        email: req.body.email,
        user_name: req.body.user_name,
        password: util.gennerateAsMd5(req.body.password)
    });
    try {
        const userChecking = await getUserByEmail(user.email);

        if (userChecking) {
            throw message.authentication.duplicate_mail;
        };

        const userCheckingName = await getUserByUserName(user.user_name);

        if (userCheckingName) {
            throw message.authentication.duplicate_name;
        }

        const registerUser = await user.save();

        return registerUser;
    } catch (error) {
        throw new Error(error);
    }
};
/**
 * 
 * @param {*} req 
 * @returns User Login Response
 */
const login = async (req: Request) => {
    try {
        const user = await getUserByUserName(req.body.user_name);

        if (!user) {
            throw message.authentication.not_find_user_name;
        }

        if (!util.compareStringAsMd5(req.body.password, user.password)) {
            throw message.authentication.password_invalid;
        }

        const tokenConfig = await updateUserToken(user);

        return userResonse(user, tokenConfig);

    } catch (error) {
        throw new Error(error);
    }
};

/**
 * 
 * TODO Revoke Token
 * 
 * @param {*} req 
 * @returns void
 */
const logout = async (req: Request) => {
    try {
        const token = util.getTokenString(req);
        const tokenInfo: any = JwtHelper.getTokenInfo(token);
        await UserSchema.updateOne(
            { _id: tokenInfo.configTokenInfo._id },
            {
                $unset: {
                    token: "",
                    timeLogin: 0,
                    expiresIn: 0,
                    refreshToken: "",
                    refreshTokenExpiresIn: 0
                }
            }
        );

        return message.authentication.logout;
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    getUserById,
    getUserByEmail,
    updateUserToken,
    registerUser,
    login,
    logout
}