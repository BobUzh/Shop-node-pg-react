const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const mailService = require('../service/mailService');
const tokenService = require('../service/tokenService');
// const userDto = require('../dtos/userDto');

class UserService {

    async registration(data) {
        const hashPassword = await bcrypt.hash(data.password, 3);
        const activationLink = uuid.v4();

        const user = await User.create({
            email: data.email,
            password: hashPassword,
            username: data.username,
            first_name: data.firstname,
            last_name: data.lastname,
            activationLink: activationLink
        });

        await mailService.sendActivationMail(data.email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

        const tokens = tokenService.generationTokens(user.dto);
        await tokenService.saveToken(user.dto.id, tokens.refreshToken);

        return {...tokens, user: user.dto};
    }

    async activate(activateLink) {
        const user = await User.findOne({where: {activationLink: activateLink}});

        if (! user) {
            throw new Error('broked activation link')
        }

        user.isActivated = 1;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({where: {email: email}});

        if (! user) {
            throw new Error('User with this Email not found');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (! isPassEquals) {
            throw new Error('password is not true');
        }

        const tokens = tokenService.generationTokens(user.dto);
        await tokenService.saveToken(user.dto.id, tokens.refreshToken);

        return {...tokens, user: user.dto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        if (! refreshToken) {
            throw new Error('token false');
        }
        console.log('service-refresh-1')
        const tokenValid = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        console.log('service-refresh-2')
        console.log(tokenFromDb)
        console.log(!tokenFromDb)
        console.log(!tokenValid)
        if (!tokenValid || !tokenFromDb) {
            throw new Error('not authorize');
        }

        const user = await User.findOne({where: {id: tokenValid.id}})
        const tokens = tokenService.generationTokens(user.dto);
        await tokenService.saveToken(user.dto.id, tokens.refreshToken);

        return {...tokens, user: user.dto};
    }

    async findByEmail(email) {
        const user = await User.findOne({where: {email: email}});

        return user;
    }
}

module.exports = new UserService();