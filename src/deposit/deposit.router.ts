import express from 'express'
import RouterInterface from '../common/router.interface';

export class DepositRouter extends RouterInterface{
    
    constructor(app: express.Application){
        super(app, 'Deposit Router')
    }
    
    configureRoutes(): express.Application {
        this.app.route('/api/deposit')
        .get()
        .post()
        this.app.route('/api/deposit/:id')
        .get()
        .patch()
        .delete()

        return this.app
    }
}