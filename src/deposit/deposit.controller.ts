import { Request, Response } from "express";
import ControllerInterface from "../common/controller.interface";
import DepoModel from "./deposit.model";

class DepoController extends ControllerInterface{

    // without params
    async getQuery(req: Request, res: Response): Promise<any> {
        return res.status(501).send('Not implemented (yet)...')
    }
    async post(req: Request, res: Response): Promise<any> {
        return res.status(501).send('Not implemented (yet)...')
    }

    // by ID
    async getById(req: Request, res: Response): Promise<any> {
        return res.status(501).send('Not implemented (yet)...')
    }
    async patchById(req: Request, res: Response): Promise<any> {
        return res.status(501).send('Not implemented (yet)...')
    }
    async deleteById(req: Request, res: Response): Promise<any> {
        return res.status(501).send('Not implemented (yet)...')
    }

        
}