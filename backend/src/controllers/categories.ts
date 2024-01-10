import {Request, Response} from 'express';
import {Categories} from '../db';

class CategoriesController {
    static getOne = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const element = await Categories.getById(id);
            return res.status(200).send(element);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const elements = await Categories.getAll();
            return res.status(200).send(elements);
        } catch(error) {
            return res.status(400).send(error);
        }
    }


    static init = async(req: Request, res: Response): Promise<Response> => {
        try {
            await Categories.init();
            return res.status(200).send('Categories initialized.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

}

export default CategoriesController;
