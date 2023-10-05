import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { Depo } from '../deposit/deposit.model'
import userModel from '../user/user.model'

import ejs from 'ejs'

/**
 * As the name suggests, it simply sends mail.
 */
export default class MailingService{

    private static instance: MailingService
    private transporter: any

    private constructor(){
        this.setupConnection()
        // this.sendFoo()   //TODO: uncomment before pushing to production
        console.log('[MAILING]: mailing service initiated.')
    }

    public static getInstance(){        
        if(!this.instance) {
            this.instance = new MailingService();
        }
        return this.instance;
    }

    /**
     * Connects with SMTP host.
     */
    private async setupConnection(){
        try {
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
        } catch (err) {
            console.log(err)
            console.log('[MAILING]: CONNECTION ERROR - Restart required')
        }        
    }

    /**
     * Sends startup log message 
     */
    private async sendFoo(){
        await this.transporter.sendMail({
            from: `"DepoApp" <${process.env.SMTP_FROM_MAIL}>`,
            to: process.env.SMTP_LOG_MAIL,
            subject: 'DepoServer startup',
            text: `Mailing service instance was created at ${new Date(Date.now()).toLocaleString('pl-pl')}`
        })
    }

    /**
     * Sends a message to the owner when his property is registered in deposit.
     * @param depo Deposit object
     */
    public async sendDepoRegisteredMessage(depo: Depo){
        
        const mailData = await this.getMailDataFromDepo(depo)

        const message = await ejs.renderFile(`${process.cwd()}/assets/templates/depo-registered.ejs`, mailData)
        .catch(err => console.log(err))

        await this.transporter.sendMail({
            from: `"DepoApp" <${process.env.SMTP_FROM_MAIL}>`,
            to: depo.mail,
            subject: `Depozyt nr ${depo._id} w SDM ${depo.sdm}`,
            html: message,    
        })

    }

    /**
     * Sends a message to the owner when deposit is updated.
     * @param depo Deposit object
     */
    public async sendDepoUpdatedMessage(depo: any){
        
        const mailData = await this.getMailDataFromDepo(depo)

        const message = await ejs.renderFile(`${process.cwd()}/assets/templates/depo-updated.ejs`, mailData)
        .catch(err => console.log(err))

        await this.transporter.sendMail({
            from: `"DepoApp" <${process.env.SMTP_FROM_MAIL}>`,
            to: depo.mail,
            subject: `Depozyt nr ${depo._id} w SDM ${depo.sdm}`,
            html: message,    
        })
    }

    /**
     * Sends warning e-mail. 
     * @param depo Depo object
     */
    public async sendDeadlineWarning(depo: any){

        const mailData = await this.getMailDataFromDepo(depo)

        const message = await ejs.renderFile(`${process.cwd()}/assets/templates/depo-deadline-warning.ejs`, mailData)
        .catch(err => console.log(err))

        await this.transporter.sendMail({
            from: `"DepoApp" <${process.env.SMTP_FROM_MAIL}>`,
            to: depo.mail,
            subject: `Depozyt nr ${depo._id} w SDM ${depo.sdm}`,
            html: message,    
        })
    }

    /**
     * Transform depo into mailData object.
     * @param depo - Deposit object
     * @returns mailData object
     */
    private async getMailDataFromDepo(depo: any){

        var keeper: any = await userModel.findById(depo.authorized_by)
        var keeperName;
        
        if(!keeper) keeperName = '[404]: keeper not found.' 
        else keeperName = `${keeper.first_name} ${keeper.last_name}`

        return {
            registeredAt: depo.depo_date.toLocaleString('pl-PL'),
            depoId: depo._id,
            SDM: depo.sdm,
            holder: `${depo.first_name} ${depo.last_name}`,
            keeper: keeperName,
            validTo: depo.valid_to.toLocaleString('pl-PL'),
            orgMail: process.env.ORG_CONTACT_MAIL,
            content: depo.content,
            status: depo.depo_status
        }
    }

    /**
     * @deprecated - only use if ncecessary (for quick testing and debugging functionalities)
     */
    public getTransporter(){
        return this.transporter
    }
}