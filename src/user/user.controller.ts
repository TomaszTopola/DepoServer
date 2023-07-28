import { Request, Response } from "express";
import UserModel from "./user.model";
import Permits from "./permits.enum";
import jwt from 'jsonwebtoken'

class UserController{

    async login (req: any, res: any) {
        try {
            const user: any = await UserModel.findById(req.body._id)
            if(user.permits.includes(Permits.ROOT)){
                const token = jwt.sign(
                    {user: user?.toJSON() || 'USER NOT FOUND'},
                    process.env.JWT_SECRET!,
                )
                return res.status(201).send({token})
            }
            const token = jwt.sign(
                {user: user?.toJSON() || 'USER NOT FOUND'},
                process.env.JWT_SECRET!,
                {expiresIn: '1h'}
            )
            return res.status(201).send({token})
        } catch (err) {
            res.status(500).send('[500] - internal server error. View server logs for full error message.')
            console.log(err);
        }
    }

    async register(req: Request, res: Response){
        try{
            const{
                _id,
                first_name,
                last_name,
                phone,
                mail,
                password,
            } = req.body
            const permits: Permits[] = []
            const user = new UserModel({
                _id,
                first_name,
                last_name,
                phone,
                mail,
                permits,
            })
            await UserModel.register(user, password)
            res.status(201).send('[201] - user registered successfuly')
        }catch(err){
            if(err == 'UserExistsError: A user with the given username is already registered')
                return res.status(409).send('User of given username already exists.')
            
            console.log('[USER CONTROLLER]:' + err);
            return res.status(500).send('internal server error, check app logs for debugging.')
        }
    }

}

export default new UserController()