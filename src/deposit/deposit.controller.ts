import { Request, Response } from "express";
import ControllerInterface from "../common/controller.interface";

import DepoModel from "./deposit.model";
import PermitsHandler from "../user/permits.handler";
import MailingService from "../mailing/mailing.service";

class DepoController extends ControllerInterface{

    // without params
    async getAll(req: Request, res: Response): Promise<any> {

        if(!(await PermitsHandler.checkDepoReadPermits(req.user))) {
            return res.redirect(`/api/no-gdpr/depo/`)
        }

        const depos = await DepoModel.find(req.query)
        .catch(err => res.send(err))
        return res.status(200).send(depos)
    }

    async post(req: Request, res: Response): Promise<any> {

        try{
            const depo = new DepoModel(req.body)
            if(! await PermitsHandler.checkDepoEditPermits(depo, req.user)){
                return res.status(401).send(`You are not authorized to edit in SDM ${depo.sdm}`)
            }
            
            const user = req.user as any
            depo.authorized_by = user._id;

            await depo.save()
            
            await MailingService.getInstance().sendDepoRegisteredMessage(depo)

            return res.status(201).send(depo)
        }catch (err: any) {

            if(err.code === 11000) return res.status(409).send('[409] - Resource already exists.')
            return res.send(err)
        }
    }

    // by ID
    async getById(req: Request, res: Response): Promise<any> {

        const depo:any = await DepoModel.findById(req.params.id)
        .catch(err => res.send(err))

        if(!(await PermitsHandler.checkDepoReadPermits(req.user, depo.album))) {
            return res.redirect(`/api/no-gdpr/depo/${req.params.id}`)
        }

        if(!depo) return res.status(401).send(`[404] - depo ID ${req.params.id} not found.`)
        
        return res.status(200).send(depo)
    }

    async patchById(req: Request, res: Response): Promise<any> {

        const originalDepo = await DepoModel.findById(req.params.id)
        if(!originalDepo) return res.status(404).send(`[404] - depo ID ${req.params.id} not found.`)
        
        if(! await PermitsHandler.checkDepoEditPermits(originalDepo, req.user)){
            return res.status(401).send(`You are not authorized to edit in SDM ${originalDepo.sdm}`)
        }

        const depo = await DepoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        .catch(err => res.send(err))
        return res.status(201).send(depo)
    }

    async deleteById(req: Request, res: Response): Promise<any> {

        if(! await PermitsHandler.checkAdminPermits(req.user)){
            return res.status(401).send('Only admin accounts can DELETE depos. Try changing depo_status to ARCHIVE')
        }
        
        const depo = await DepoModel.findById(req.params.id)
        if(!depo) return res.status(404).send(`[404] - depo ID ${req.params.id} not found.`)

        if(! await PermitsHandler.checkDepoEditPermits(depo, req.user)){
            return res.status(401).send(`You are not authorized to edit in SDM ${depo.sdm}`)
        }

        await DepoModel.findByIdAndDelete(req.params.id)
        .catch(err => res.send(err))

        return res.status(204).send(`Deleted depo ID: ${req.params.id}`)
    }


    //No auth 

    async getAllNoGDPR(req: Request, res: Response): Promise<any> {
        const depos = await DepoModel.find(req.query, '_id depo_status depo_date valid_to sdm')   //only returns keys in quotes 
        .catch(err => res.send(err))

        return res.send(depos)
    }

    async getOneNoGDPR(req: Request, res: Response): Promise<any> {
        const depos = await DepoModel.findById(req.params.id, '_id depo_status depo_date valid_to sdm')   //only returns keys in quotes 
        .catch(err => res.send(err))
        if(!depos) return res.status(404).send(`[404] - depo ID ${req.params.id} not found.`)
        return res.send(depos)
    }

}

export default new DepoController()