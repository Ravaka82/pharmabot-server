import {Request, Response} from 'express';
import {TemplateService} from "./template.service";

class TemplateController {
    constructor() {}

    Default(req: Request, res: Response): void {
        res.end('Template controller works.');
    }

    Create = async (req: Request, res: Response): Promise<void> => {
        try {
            const template = await TemplateService.create(req.body);
            res.json(template);
        } catch(error) {
            res.json({
                errorMessage: error
            })
        }
    }

    GetOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const entries = await TemplateService.getById(req.params.id);
            res.json(entries);
        } catch(error) {
            res.json({
                errorMessage: error
            })
        }
    }

    GetAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const entries = await TemplateService.getAll();
            res.json(entries);
        } catch(error) {
            res.json({
                errorMessage: error
            })
        }
    }

    UpdateOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const entries = await TemplateService.updateById(req.params.id, req.body);
            res.json(entries);
        } catch(error) {
            res.json({
                errorMessage: error
            })
        }
    }

    DeleteOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const entries = await TemplateService.deleteById(req.params.id);
            res.json(entries);
        } catch(error) {
            res.json({
                errorMessage: error
            })
        }
    }
}

export default new TemplateController();
