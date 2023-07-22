import * as dotenv from 'dotenv'
import express from 'express'

import MongoController from './common/mongo.controller'

const app = express()
dotenv.config({path: './.env'})

const main = async () => {

    console.log("connecting to Mongo...");
    await MongoController.setupMongo()
    
    app.get('/', (req, res) =>{
        return res.status(200).send('Hello World')
    })

    app.listen(process.env.HTTP, () => console.log(`Listening on port ${process.env.HTTP}...`))
    
}

main()