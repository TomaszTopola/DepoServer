import schedule from 'node-schedule'
import MailingService from './mailing.service'

/**
 * Schedules jobs
 */
export default class Scheduler {
    
    public static setupSchedule() {
        schedule.scheduleJob('00 12 * * *', this.sendStaus)
        console.log('[SCHEDULER]: jobs are scheduled!')
    }

    private static sendStaus(){
        const mailing = MailingService.getInstance()
        const transporter = mailing.getTransporter()
        
        transporter.sendMail({
            from: `"DepoApp" <${process.env.SMTP_FROM_MAIL}>`,
            to: process.env.SMTP_FROM_MAIL,
            subject: 'DepoServer noon report',
            text: `DepoServer operating as intended. \n\n DepoServer out...\n *static noises*`
        })
    }
}