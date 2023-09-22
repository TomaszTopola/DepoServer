import mongoose from 'mongoose'
import AsyncTime from './async.time'
import StatusSingleton from './status.singleton'

class MongoController{

    private _connected: boolean = false

    constructor(){
        this._connected = StatusSingleton.getDbConnectedStatus()
    }

    async setupMongo(): Promise<void>{
        
        try{
            console.log("[MONGOOSE]: connecting to Mongo...")
            if(this._connected) return console.log('[MONGOOSE]: Database connection established.')
            
            const mongoURL = process.env.MONGO_URL!
            await mongoose.connect(mongoURL)
            
    
            console.log('[MONGOOSE]: Database connection established.')
            StatusSingleton.setDbConnectedStatus(true)
        }catch(err){
            console.log('[MONGOOSE]: Error on DB connection:')
            console.log(err)
            StatusSingleton.setDbConnectedStatus(false)
            this.reattemptConnection()
        }
        
    }

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