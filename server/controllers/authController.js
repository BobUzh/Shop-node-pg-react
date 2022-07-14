const userService = require('../service/userService');
const tokenService = require('../service/tokenService');
const bcrypt = require('bcrypt');

class AuthController {

    async registration(req, res, next) {
        try {
            console.log('req.body');
            console.log(req.body);
            const candidate = await userService.findByEmail(req.body.email);
            if (candidate) {
                return res.status(409).send(`${req.body.email} такий e-mail вже заєєстровано `);
            }

            const userData = await userService.registration({...req.body});
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            return res.json(userData);
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await userService.findByEmail(email);

            if (! user) {
                return res.status(400).send(`не коректний e-mail ${req.body.email}`);
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            if (! isPassEquals) {
                return res.status(400).send(`не коректний password`);
            }

            const tokens = tokenService.generationTokens(user.dto);
            await tokenService.saveToken(user.dto.id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            return res.json({...tokens, user: user.dto});
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    async logout(req, res, next) {
        try {
            console.log('dfs')
            const {refreshToken} = req.cookies;
            console.log(refreshToken);

            if (refreshToken) {
                const token = await userService.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.json(token);
            }


            // return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e)
        }
    }

    async activateLink(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log('c-refresh')
            console.log(refreshToken)
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            console.log('c-after cookie')
            return res.json(userData);
        } catch (e) {
            console.log(e)
            // res.redirect(process.env.CLIENT_URL + '/login');
        }
    }

    async all(req, res, next) {
        try {
            const refreshToken = res.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            return res.json(userData);
        } catch (e) {
            console.log(e)
            res.sendStatus(404);
        }
    }

}

module.exports = new AuthController();