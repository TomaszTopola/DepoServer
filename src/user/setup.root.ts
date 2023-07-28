import Permits from "./permits.enum"
import userModel from "./user.model"

class SetupRoot{

    async setup(){
        const root = await userModel.findById('root')
        if(!root){
            const root = new userModel({
                _id: 'root',
                first_name: process.env.ROOT_FIRST_NAME || 'root',
                last_name: process.env.ROOT_LAST_NAME || 'root',
                phone: process.env.ROOT_PHONE || 'example',
                mail: process.env.ROOT_MAIL || 'example@example.com',
                permits: [Permits.ROOT],
            })
            const pass = process.env.ROOT_PASS || 'root_pass'
            userModel.register(root, pass)
            .catch(err => console.log(err))

            console.log('[ROOT]: registered new root account.')
        }
        else{
            const user: any = await userModel.findByIdAndUpdate(
                'root',
                {
                    first_name: process.env.ROOT_FIRST_NAME || 'root',
                    last_name: process.env.ROOT_LAST_NAME || 'root',
                    phone: process.env.ROOT_PHONE || 'example',
                    mail: process.env.ROOT_MAIL || 'example@example.com',
                    password: process.env.ROOT_PASS || 'root_pass'
                },
            ).catch(err => console.log(err))

            console.log('[ROOT]: root account updated with current credentials.')
        }
    }
}

export default SetupRoot