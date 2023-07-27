import passport, { DoneCallback } from 'passport'
import passportJWT from 'passport-jwt'
import UserModel from '../user/user.model'
import {Request, Response, NextFunction} from 'express'

export default class PassportController{

    static async setup(){
        
        const ExtractJwt = passportJWT.ExtractJwt

        const config = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        }
        
        const JWTstrategy = new passportJWT.Strategy(
            config, 
            async (payload, done) => {
                var user
                try{
                    user = await UserModel.findById(payload.user._id)
                }catch(err){
                    return done(err, false)
                }
                if(user){
                    return done(null, user)
                }
                else{
                    return done(null, false)
                }
            }
        )
        

        passport.use(UserModel.createStrategy())
        passport.use('jwt', JWTstrategy)

        console.log('[PASSPORT]: setup finished.')
    }

    static async auth(req: Request, res: Response, next: NextFunction){
        await passport.authenticate('jwt', {session: false})(req, res, next)
    }
}