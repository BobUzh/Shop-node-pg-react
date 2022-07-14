const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        });
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'vox@mail.com',
            to,
            subject: 'VOX Yeahoo' + process.env.API_URL,
            text: '',
            html:`
                <div>
                    <h1>for activate go to link</h1>
                    <a href="${link}">${link}</a>
                </div>
            `

        });
    }

}

module.exports = new MailService();