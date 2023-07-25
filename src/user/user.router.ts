import express from 'express'
import passport from 'passport'

import UserController from './user.controller'
import RouterInterface from '../common/router.interface'
import PassportController from '../common/passport.controller'

export default class UserRouter extends RouterInterface{
    
    constructor(app: express.Application){
        super(app, 'User Router')
    }

    configureRoutes(): express.Application {

        this.app.route('/api/users/login')
        .post(passport.authenticate('local', {session: false}), UserController.login)

        this.app.route('/api/users/register')
        .post(UserController.register)

        return this.app
    }

}