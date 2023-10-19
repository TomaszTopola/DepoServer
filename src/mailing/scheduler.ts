import schedule from 'node-schedule'
import MailingService from './mailing.service'

import DepoModel, { Depo } from '../deposit/deposit.model';
import DepoStatus from '../deposit/depo.status.enum';

/**
 * Schedules jobs
 */
export default class Scheduler {
    
    public static setupSchedule() {
        // schedule.scheduleJob('00 12 * * *', this.sendStaus)
        schedule.scheduleJob('00 12 * * *', this.sendDeadlineWarnings)
        console.log('[SCHEDULER]: jobs are scheduled!')
    }

    /**
     * Sends daily status updates to selected e-mail.
     */
    private static sendStaus(){
        const mailing = MailingService.getInstance()
        const transporter = mailing.getTransporter()
    }

    /**
     * When depo deadline (valid_to) is less than week from today it sends automatic warnings to users.
     */
    private static async sendDeadlineWarnings(){
        const sevenDaysFromNow = new Date().setDate(new Date().getDate() + 7)
        const depos = await DepoModel.find({
            valid_to: { '$lte': sevenDaysFromNow },
            depo_status: DepoStatus.ACTIVE
        }) as [Depo]
        console.log('outdated depos to be contacted: ' + depos)

        for (const depo of depos){
            const updatedDepo = await DepoModel.findByIdAndUpdate(
                depo._id,
                {'depo_status': DepoStatus.CONTACTED},
                {new: true}
            )
            await MailingService.getInstance().sendDeadlineWarning(updatedDepo)
        }
    }
}