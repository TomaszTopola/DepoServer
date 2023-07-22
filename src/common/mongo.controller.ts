import mongoose from 'mongoose'
import AsyncTime from './async.time'
import StatusSingleton from './status.singleton'

class MongoController{

    private _connected: boolean = false

    constructor(){
        this._connected = StatusSingleton.getDbConnectedStatus()
    }

    async setupMongo(): Promise<void>{
        if(this._connected) return console.log('Database connection established.')
        
        const mongoURL = process.env.MONGO_URL!
        await mongoose.connect(mongoURL)
        
        mongoose.connection.on('error', (err) => {
            console.log('Error on DB Connection:')
            console.log(err)
            StatusSingleton.setDbConnectedStatus(false)
            this.reattemptConnection()
            return
        })

        console.log('Database connection established.')
        StatusSingleton.setDbConnectedStatus(true)
        
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
                console.log('Error on DB Connection:')
                console.log(err)
                StatusSingleton.setDbConnectedStatus(false)
                console.log('No DB connection. Reattempting in 1 minutes...');
            }
            await AsyncTime.delay(6000)
        }
    }
}

export default new MongoController()