import {Request, Response, NextFunction} from 'express';
import {Recipes, Users} from '../db';
import U from '../common/u';

class PermissionsMiddleware {
    static isAuthor = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            const recipe = await Recipes.getById(id);
            const user = await Users.getByToken(U.getToken(req));
            if(user.id !== recipe.author) return res.status(401).send('Only authors can edit/delete recipes.');
            next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default PermissionsMiddleware;
