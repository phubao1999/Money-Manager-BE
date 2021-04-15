import constant from "../../constant/constant";

const userResonse = (user: any, tokenObj: any) => {
    return {
        user_name: user.user_name,
        token: tokenObj.token,
        expiresIn: tokenObj.expiresIn,
        timeLogin: tokenObj.timeLogin,
        refreshToken: tokenObj.refreshToken,
        refreshTokenExpiresIn: tokenObj.refreshTokenExpiresIn,
        tokenType: constant.TOKEN_TYPE
    }
};

export default userResonse;