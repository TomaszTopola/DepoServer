import mongoose from 'mongoose'

class MongoController{

    private _connected: boolean = false

    async setupMongo(): Promise<void>{
        const mongoURL = process.env.MONGO_URL!
        try {
            await mongoose.connect(mongoURL)
            mongoose.connection.on('error', (err) => {
                this.close()
                this.reattemptConnection()
            })
        } catch (err) {
            console.log('Error on DB Connection:')
            console.log(err)
            this._connected = false
            this.reattemptConnection()
            return 
        }
        console.log('Database connection established.')
    }

    async close(){
        mongoose.connection.close()
    }
    
    private async reattemptConnection(){
        while(!this._connected){
            this._connected = true
            const mongoURL = process.env.MONGO_URL!
            try {
                await mongoose.connect(mongoURL)
            } catch (err) {
                console.log('Error on DB Connection:')
                console.log(err)
                this._connected = false
                console.log('No DB connection. Reattempting in 1 minutes...');
            }
            await this.delay(6000)
        }
    }

    private delay(ms:number) {
        return new Promise ( resolve => setTimeout(resolve, ms))
    }
}

export default new MongoController()