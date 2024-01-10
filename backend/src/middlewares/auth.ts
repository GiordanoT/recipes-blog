import {Request, Response, NextFunction} from 'express';
import {Users} from '../db';
import {merge} from 'lodash';
import U from '../common/u';

class AuthMiddleware {
    static isAuthenticated = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const token = U.getToken(req);
            if(!token) return res.status(401).send('Token not provide.');
            const existingUser = await Users.getByToken(token);
            if(!existingUser) res.status(401).send('Invalid Token.');
            merge(req, {identity: existingUser});
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default AuthMiddleware;
