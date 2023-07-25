import {Request, Response} from "express";

export default abstract class ControllerInterface{

    // for entries without params
    abstract getAll(req: any, res: any): Promise<any>
    abstract post(req: any, res: any): Promise<any>

    // by ID
    abstract getById(req: any, res: any): Promise<any>
    abstract patchById(req: any, res: any): Promise<any>
    abstract deleteById(req: any, res: any): Promise<any>
}