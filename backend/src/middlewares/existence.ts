import {Request, Response, NextFunction} from 'express';
import {Categories, Recipes, Menus, Users} from '../db';

class ExistenceMiddleware {
    static user = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            const element = await Users.getById(id);
            if(!element) return res.status(404).send('User not found.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
    static category = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            const element = await Categories.getById(id);
            if(!element) return res.status(404).send('Category not found.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
    static recipe = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            const element = await Recipes.getById(id);
            if(!element) return res.status(404).send('Recipe not found.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
    static menu = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            const element = await Menus.getById(id);
            if(!element) return res.status(404).send('Menu not found.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default ExistenceMiddleware;
