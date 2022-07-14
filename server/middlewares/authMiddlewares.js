const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;

        if (! authorizationHeader) {
            throw new Error('Unauthorize');
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (! accessToken) {
            throw new Error('Unauthorize');
        }

        const userData = tokenService.validateAccessToken(accessToken);

        if (! userData) {
            throw new Error('Unauthorize');
        }

        req.user = userData;
        next();

    } catch (e) {
        console.log(e)
    }

};