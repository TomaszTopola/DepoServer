import express from 'express'
import RouterInterface from '../common/router.interface';
import DepoController from './deposit.controller';

class DepositRouter extends RouterInterface{
    
    constructor(app: express.Application){
        super(app, 'Deposit Router')
    }
    
    configureRoutes(): express.Application {
        this.app.route('/api/depo')
        .get(DepoController.getAll)
        .post(DepoController.post)
        
        this.app.route('/api/depo/:id')
        .get(DepoController.getById)
        .patch(DepoController.patchById)
        .delete(DepoController.deleteById)

        return this.app
    }
}

export default DepositRouter