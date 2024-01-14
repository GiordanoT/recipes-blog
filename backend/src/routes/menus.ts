import {Router} from 'express';
import ExistenceMiddleware from '../middlewares/existence';
import IdMiddleware from '../middlewares/id';
import AuthMiddleware from '../middlewares/auth';
import MenusController from '../controllers/menus';

const router = Router();


router
    .route('/')
    .get(AuthMiddleware.isAuthenticated, MenusController.getByAuthor)
    .post(AuthMiddleware.isAuthenticated, MenusController.create)

router
    .route('/:id')
    .get(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.menu, MenusController.getOne)
    .patch(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.menu, MenusController.update)
    .delete(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.menu, MenusController.delete)


export {router as MenusRouter};

