import {Request, Response} from 'express';
import {Favorites, Users} from '../db';
import U from '../common/u';

class FavoritesController {
    static create = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const recipe = id;
            const user = (await Users.getByToken(U.getToken(req))).id;
            if(await Favorites.getByUserAndRecipe(user, recipe))
                return res.status(400).send('Recipe already in favorites.');
            await Favorites.create({user, recipe});
            return res.status(200).send('Recipe added in favorites.');
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params; const recipe = id;
            const user = (await Users.getByToken(U.getToken(req))).id;
            if(!(await Favorites.getByUserAndRecipe(user, recipe)))
                return res.status(400).send('Recipe is not in favorites.');
            await Favorites.delete(user, recipe);
            return res.status(200).send('Recipe removed from favorites.');
        } catch(error) {
            return res.status(400).send(error);
        }
    }

    static getByUser = async(req: Request, res: Response): Promise<Response> => {
        try {
            const user = (await Users.getByToken(U.getToken(req))).id;
            const recipes = await Favorites.getByUser(user);
            return res.status(200).send(recipes);
        } catch(error) {
            return res.status(400).send(error);
        }
    }

}

export default FavoritesController;
