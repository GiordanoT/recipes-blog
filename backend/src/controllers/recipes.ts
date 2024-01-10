import {Request, Response} from 'express';
import {Categories, Recipes, Users} from '../db';
import U from '../common/u';

class RecipesController {
    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {name, category, ingredients, duration, description, image} = req.body;
            if (!name || !category || !ingredients || !duration || !description || !image)
                return res.status(400).send('Missing required parameters.');
            if(!U.isId(category) || !(await Categories.getById(category)))
                return res.status(400).send('Invalid data.');
            const author = (await Users.getByToken(U.getToken(req))).id;
            const element = await Recipes.create({name, author, category, ingredients, duration, description, image});
            return res.status(200).send(element);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static getOne = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const element = await Recipes.getById(id);
            return res.status(200).send(element);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const elements = await Recipes.getAll();
            return res.status(200).send(elements);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getByAuthor = async(req: Request, res: Response): Promise<Response> => {
        try {
            const author = (await Users.getByToken(U.getToken(req))).id;
            const elements = await Recipes.getByAuthor(author);
            return res.status(200).send(elements);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getByCategory = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const elements = await Recipes.getByCategory(id);
            return res.status(200).send(elements);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getByName = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {search} = req.body;
            let elements = [];
            if(!search) elements = await Recipes.getAll();
            else elements = await Recipes.getByName(search);
            return res.status(200).send(elements);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static update = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const {name, category, ingredients, duration, description, image} = req.body;
            if(category && !Categories.getById(category)) res.status(400).send('Invalid data.');
            await Recipes.update(id, {name, category, ingredients, duration, description, image});
            return res.status(200).send('Recipe updated.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Recipes.delete(id);
            return res.status(200).send('Recipe deleted.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default RecipesController;
