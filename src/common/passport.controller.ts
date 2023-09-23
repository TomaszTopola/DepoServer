import passport, { DoneCallback } from 'passport'
import passportJWT from 'passport-jwt'
import UserModel from '../user/user.model'
import {Request, Response, NextFunction} from 'express'

/**
 * Manages Passport.js settings. Responsible for authorization/authentication services.
 */
export default class PassportController{

    /**
     * Sets up Passport.js with all settings.
     * @returns void
     */
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

    /**
     * Callback function. Authenticates JWT token.
     * @param req HTTP request
     * @param res HTTP response
     * @param next next function
     */
    static async auth(req: Request, res: Response, next: NextFunction){
        await passport.authenticate('jwt', {session: false})(req, res, next)
    }
}