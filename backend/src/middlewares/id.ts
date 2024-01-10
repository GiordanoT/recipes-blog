import {Request, Response, NextFunction} from 'express';
import U from '../common/u';

class IdMiddleware {
    static validate = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const {id} = req.params;
            if (!U.isId(id)) return res.status(400).send('Invalid ID.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default IdMiddleware;
