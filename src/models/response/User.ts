const userResonse = (user: any) => {
    return {
        user_name: user.user_name,
        token: user.token,
        expiresIn: user.expiresIn,
        timeLogin: user.timeLogin,
        refreshToken: user.refreshToken,
        refreshTokenExpiresIn: user.refreshTokenExpiresIn
    }
};

export default userResonse;