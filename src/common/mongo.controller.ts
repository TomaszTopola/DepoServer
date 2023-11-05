import mongoose from 'mongoose'
import AsyncTime from './async.time'
import StatusSingleton from './status.singleton'

/**
 * Handles all MongoDB interactions.
 */
class MongoController{

    private _connected: boolean = false

    constructor(){
        this._connected = StatusSingleton.getDbConnectedStatus()
    }

    /**
     * Establishes MongoDB Connection, sets up connection related error handling.
     * @returns void
     */
    async setupMongo(): Promise<void>{
        
        console.log("[MONGOOSE]: connecting to Mongo...")
        if(this._connected) return console.log('[MONGOOSE]: Database connection established.')
        
        const mongoURL = process.env.MONGO_URL!
        console.log('[MONGO_URL]: ' + mongoURL)
        await mongoose.connect(mongoURL)
        
        mongoose.connection.on('error', (err) => {
            console.log('[MONGOOSE]: Error on DB Connection:')
            console.log(err)
            StatusSingleton.setDbConnectedStatus(false)
            this.reattemptConnection()
            return
        })

        console.log('[MONGOOSE]: Database connection established.')
        StatusSingleton.setDbConnectedStatus(true)
        
    }

    /**
     * Shuts down MongoDB connection.
     */
    async close(){
        mongoose.connection.close()
    }
    
    private async reattemptConnection(){

        while(!StatusSingleton.getDbConnectedStatus){
            StatusSingleton.setDbConnectedStatus(true)
            const mongoURL = process.env.MONGO_URL!
            try {
                await mongoose.connect(mongoURL)
            } catch (err) {
                console.log('[MONGOOSE]: Error on DB Connection:')
                console.log(err)
                StatusSingleton.setDbConnectedStatus(false)
                console.log('[MONGOOSE]: No DB connection. Reattempting in 1 minutes...');
            }
            await AsyncTime.delay(6000)
        }
    }
}

export default new MongoController()