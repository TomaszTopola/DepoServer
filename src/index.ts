import * as dotenv from 'dotenv'
import express from 'express'

import MongoController from './common/mongo.controller'
import DepositRouter from './deposit/deposit.router'
import UserRouter from './user/user.router'
import PassportController from './common/passport.controller'
import MailingService from './mailing/mailing.service'
import Scheduler from './mailing/scheduler'
import statusSingleton from './common/status.singleton'
import userController from './user/user.controller'

const app = express()
dotenv.config({
    path: `./${process.env.NODE_ENV}.env`
})

const main = async () => {

    console.log('[NODE_ENV]: ' + process.env.NODE_ENV)

    if(process.env.NODE_ENV == 'development'){
        statusSingleton.enableMailLog = false;
        statusSingleton.enableMailNotifications = false;
        console.log('[ENV]: Mailing disabled (development mode)');
    }
    else{
        statusSingleton.enableMailLog = true;
        statusSingleton.enableMailNotifications = true;
    }

    await MongoController.setupMongo()
    
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use('/assets', express.static('public'))

    await PassportController.setup()


    app.get('/', (req, res) =>{
        return res.status(200).send('Hello World')
    })

    new DepositRouter(app).configureRoutes()
    new UserRouter(app).configureRoutes()

    userController.setupRoot()

    Scheduler.setupSchedule()
    MailingService.getInstance()

    app.listen(process.env.HTTP, () => console.log(`[SERVER]: Listening on port ${process.env.HTTP}...`))

    process.on('exit', () => {
        MongoController.close()
    })
}

main()