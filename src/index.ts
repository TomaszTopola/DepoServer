import * as dotenv from 'dotenv'
import express from 'express'

import MongoController from './common/mongo.controller'
import DepositRouter from './deposit/deposit.router'
import UserRouter from './user/user.router'
import PassportController from './common/passport.controller'
import SetupRoot from './user/setup.root'
import MailingService from './mailing/mailing.service'
import Scheduler from './mailing/scheduler'

const app = express()
dotenv.config({path: './.env'})

const main = async () => {

    await MongoController.setupMongo()
    
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    await PassportController.setup()


    app.get('/', (req, res) =>{
        return res.status(200).send('Hello World')
    })

    new DepositRouter(app).configureRoutes()
    new UserRouter(app).configureRoutes()

    new SetupRoot().setup() //TODO: refactor  (move to user.controller.ts)

    Scheduler.setupSchedule()
    MailingService.getInstance()

    app.use('/assets', express.static('public'))
    
    app.listen(process.env.HTTP, () => console.log(`[SERVER]: Listening on port ${process.env.HTTP}...`))

    process.on('exit', () => {
        MongoController.close()
    })
}

main()