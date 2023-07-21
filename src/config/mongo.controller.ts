import mongoose from 'mongoose'

class MongoController{

    async setupMongo(): Promise<void>{
        const mongoURL = process.env.MONGO_URL!
        await mongoose.connect(mongoURL)
        mongoose.connection.on('error', (err) => {
            console.log('Error on DB Connection:')
            console.log(err)
            process.exit(err.message)
        })
        console.log('Database connection established.')
    }

    async close(){
        mongoose.connection.close()
    }
}

export default new MongoController()