import { Request, Response } from "express";
import UserModel from "./user.model";
import Permits from "./permits.enum";
import jwt from 'jsonwebtoken'
import PermitsHandler from "./permits.handler";

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
        }catch(err: any){
            if(err == 'UserExistsError: A user with the given username is already registered')
                return res.status(409).send('User of given username already exists.')
            if(err.code === 11000){
                return res.status(409).send(`User with e-mail ${req.body.mail} already exists`)
            }
            console.log(err.code)
            console.log('[USER CONTROLLER]:' + err);
            return res.status(500).send('internal server error, check app logs for debugging.')
        }
    }

    async updatePermits(req: Request, res: Response){

        if(! await PermitsHandler.checkAdminPermits(req.user)){
            return res.status(401).send('Only admins can manage permits.')
        }

        var permits: Permits[] = []

        if(req.body.admin) permits.push(Permits.ADMIN)
        if(req.body.korab) permits.push(Permits.KORAB)
        if(req.body.pasat) permits.push(Permits.PASAT)

        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            {permits: permits},
            {new: true}
        )
        .catch(err => res.send(err))

        if(!user) return res.status(404).send('User not found')

        res.send(user)
    }

    async updateUser(req: Request, res: Response){
        const attemptingUser:any = req.user
        if(attemptingUser._id != req.params.id) return res.status(401).send('Unauthorized.')
        
        var newUser = req.body
        newUser.permits = attemptingUser.permits

        const savedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            newUser,
            {new: true}
        )
        .catch(err => res.send(err))

        return res.status(201).send(savedUser)
    }

    async getAll(req: Request, res: Response){
        if(! await PermitsHandler.checkAdminPermits(req.user)){
            return res.status(401).send('Only admins can view users')
        }
        const users = await UserModel.find(req.query)
        return res.send(users)
    }

    async getOneById(req: Request, res: Response){
        if(!await PermitsHandler.checkAdminOrSelf(req.user, req.params.id)){
            return res.status(401).send('Only admins can view users')
        }
        const user = UserModel.findById(req.params.id)
        if(!user) return res.status(404).send(`User ID ${req.params.id} not found`)
        return res.send(user)
    }
}

export default new UserController()