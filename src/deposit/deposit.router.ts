import express from 'express'
import RouterInterface from '../common/router.interface';
import DepoController from './deposit.controller';
import PassportController from '../common/passport.controller';

/**
 * Sets up routes and auth callbacks for Deposits.
 */
class DepositRouter extends RouterInterface{
    
    constructor(app: express.Application){
        super(app, 'Deposit Router')
    }
    
    configureRoutes(): express.Application {
        this.app.route('/api/depo')
        .get(PassportController.auth, DepoController.getAll)
        .post(PassportController.auth, DepoController.post)
        
        this.app.route('/api/depo/:id')
        .get(PassportController.auth, DepoController.getById)
        .patch(PassportController.auth, DepoController.patchById)
        .delete(PassportController.auth, DepoController.deleteById)


        this.app.route('/api/no-gdpr/depo/')
        .get(DepoController.getAllNoGDPR)

        this.app.route('/api/no-gdpr/depo/:id')
        .get(DepoController.getOneNoGDPR)

        return this.app
    }
}

export default DepositRouter