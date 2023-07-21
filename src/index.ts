import * as dotenv from 'dotenv'
import express from 'express'

import MongoController from './config/mongo.controller'

const app = express()
dotenv.config({path: './.env'})

const main = async () => {

    await MongoController.setupMongo()

    app.listen(process.env.HTTP, () => console.log(`Listening on port ${process.env.HTTP}...`))
}

main()