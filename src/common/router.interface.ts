import express from 'express';

export default abstract class RouterInterface {
    app: express.Application
    name: string
    
    constructor(app: express.Application, name: string){
        this.app = app
        this.name = name
        this.configureRoutes()
        console.log(`[ROUTER]: Registered ${this.name}.`);        
    }

    abstract configureRoutes(): express.Application
}