import { Request, Response } from "express";
import ControllerInterface from "../common/controller.interface";

import DepoModel from "./deposit.model";

export class DepoController extends ControllerInterface{

    // without params
    async getAll(req: Request, res: Response): Promise<any> {
        const depos = await DepoModel.find(req.query)
        .catch(err => res.send(err))
        return res.status(200).send(depos)
    }

    async post(req: Request, res: Response): Promise<any> {
        // return res.status(501).send('Not implemented (yet)...')
        try {
            const depo = new DepoModel(req.body)
            await depo.save()
            return res.status(201).send(depo)
        } catch (error) {
            return res.send(error)
        }
    }

    // by ID
    async getById(req: Request, res: Response): Promise<any> {
        const depo = await DepoModel.findById(req.params.id)
        .catch(err => res.send(err))
        if(!depo) return res.status(401).send(`[404] - depo ID ${req.params.id} not found.`)
        return res.status(200).send(depo)
    }

    async patchById(req: Request, res: Response): Promise<any> {
        // return res.status(501).send('Not implemented (yet)...')
        const depo = await DepoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        .catch(err => res.send(err))
        if(!depo) return res.status(404).send('[404] - no entry was found')
        return res.status(201).send(depo)
    }

    async deleteById(req: Request, res: Response): Promise<any> {
        await DepoModel.findByIdAndDelete(req.params.id)
        .catch(err => res.send(err))
        return res.status(204).send(`Deleted depo ID: ${req.params.id}`)
    }

}