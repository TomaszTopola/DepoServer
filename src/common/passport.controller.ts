import passport from 'passport'
import passportJWT from 'passport-jwt'
import userModel from '../user/user.model'
import {Request, Response, NextFunction} from 'express'

export default class PassportController{

    static async setup(){
        const JWTStrategy = passportJWT.Strategy
        const ExtractJwt = passportJWT.ExtractJwt
        const config = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            issuer: 'DepoApp',
            
        }

        passport.use(userModel.createStrategy())
        passport.use(new JWTStrategy(config, this.authenticateCallback))
    }

    static async authenticateCallback(payload: any, done: any){     //TODO: check and assure types for this function
        return await userModel.findOne({_id: payload.id})
        .then(user => {
            if(user) return done(null, user)
            else return done(null, false)
        })
        .catch(err => done(err, false))
    }

    static async auth(req: Request, res: Response, next: NextFunction){
        console.log(req.body)        
        passport.authenticate('jwt', {session: false})(req, res, next)
    }
}