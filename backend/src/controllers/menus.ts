import {Request, Response} from 'express';
import {Menus, Recipes, Users} from '../db';
import U from '../common/u';

class MenusController {
    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {name} = req.body;
            if (!name)
                return res.status(400).send('Missing required parameters.');
            const author = (await Users.getByToken(U.getToken(req))).id;
            const element = await Menus.create({name, author, recipes: []});
            return res.status(200).send(element);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static getOne = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const element = await Menus.getById(id);
            return res.status(200).send(element);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getByAuthor = async(req: Request, res: Response): Promise<Response> => {
        try {
            const author = (await Users.getByToken(U.getToken(req))).id;
            const elements = await Menus.getByAuthor(author);
            return res.status(200).send(elements);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static update = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const {name, recipes} = req.body;
            for(const id of recipes) {
                if(!U.isId(id) || !(await Recipes.getById(id)))
                    return res.status(400).send('Invalid data.');
            }
            await Menus.update(id, {name, recipes});
            return res.status(200).send('Menu updated.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            await Menus.delete(id);
            return res.status(200).send('Menu deleted.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default MenusController;
