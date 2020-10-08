import nodemailer from 'nodemailer'
import pug from 'pug'
import htmlToText from 'html-to-text'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.firstName;
        this.url = url;
        this.from = `Akash Singh <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        // Sendgrid
        return nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
    }

    // Send the actual email
    async send(template, subject) {
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions, (err, res) => {
            if(err) {
                console.log(err)
            }
        });
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to Insights Family!');
    }

    async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Your password reset token (valid for only 10 minutes)'
        );
    }
};