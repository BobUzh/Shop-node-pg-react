const jwt = require('jsonwebtoken');

const { UserToken } = require('../models/models');

class TokenService {
    generationTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {accessToken, refreshToken};
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await UserToken.findOne({where: {user_id: userId}});

        if (tokenData) {
            tokenData.token = refreshToken;

            return tokenData.save();
        }

        const token = await UserToken.create({user_id: userId, token: refreshToken});

        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await UserToken.destroy({where:{token: refreshToken}});

        return tokenData;
    }

    async findToken(refreshToken) {
        console.log('find in DB refresh token')
        console.log(refreshToken)
        const tokenData = await UserToken.findOne({where:{token: refreshToken}});
        console.log(tokenData)
        console.log('find token in db')
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            console.log('valid token')
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            console.log('service valid refresh token')
            return userData;
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();