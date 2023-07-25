import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

import MongoController from './common/mongo.controller'
import DepositRouter from './deposit/deposit.router'
import UserRouter from './user/user.router'
import PassportController from './common/passport.controller'

const app = express()
dotenv.config({path: './.env'})

const main = async () => {

    await MongoController.setupMongo()
    
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    PassportController.setup()


    app.get('/', (req, res) =>{
        return res.status(200).send('Hello World')
    })

    new DepositRouter(app).configureRoutes()
    new UserRouter(app).configureRoutes()

    app.listen(process.env.HTTP, () => console.log(`[SERVER]: Listening on port ${process.env.HTTP}...`))
    
    process.on('exit', () => {
        MongoController.close()
    })
}

main()