import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class MailingService{

    private static instance: MailingService
    private transporter: any

    private constructor(){
        this.setupConnection()
        this.sendFoo()
        console.log('[MAILING]: mailing service initiated.')
    }

    public static getInstance(){
        if(!this.instance) {
            this.instance = new MailingService();
        }
        return this.instance;
    }

    private async setupConnection(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            secureConnection: false,
            port: process.env.SMTP_PORT,
            tls: {
                ciphers:'SSLv3'
            },
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        } as SMTPTransport.Options)
    }

    private async sendFoo(){
        await this.transporter.sendMail({
            from: `"DepoApp" <${process.env.SMTP_FROM_MAIL}>`,
            to: process.env.SMTP_FROM_MAIL,
            subject: 'DepoServer startup',
            text: `Mailing service instance was created at ${new Date(Date.now()).toLocaleString('pl-pl')}`
        })
    }
}