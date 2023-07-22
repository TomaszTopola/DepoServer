import {Request, Response} from "express";

export default abstract class ControllerInterface{

    // for entries without params
    abstract getQuery(req: Request, res: Response): Promise<any>
    abstract post(req: Request, res: Response): Promise<any>

    // by ID
    abstract getById(req: Request, res: Response): Promise<any>
    abstract patchById(req: Request, res: Response): Promise<any>
    abstract deleteById(req: Request, res: Response): Promise<any>
}