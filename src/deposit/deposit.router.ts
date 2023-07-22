import express from 'express'
import RouterInterface from '../common/router.interface';
import { DepoController } from './deposit.controller';

class DepositRouter extends RouterInterface{
    
    constructor(app: express.Application){
        super(app, 'Deposit Router')
    }
    
    configureRoutes(): express.Application {
        this.app.route('/api/depo')
        .get( new DepoController().getAll)
        .post(new DepoController().post)
        
        this.app.route('/api/depo/:id')
        .get(new DepoController().getById)
        .patch(new DepoController().patchById)
        .delete(new DepoController().deleteById)

        return this.app
    }
}

export default DepositRouter