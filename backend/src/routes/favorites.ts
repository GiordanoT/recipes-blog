import {Router} from 'express';
import IdMiddleware from '../middlewares/id';
import FavoritesController from '../controllers/favorites';
import ExistenceMiddleware from '../middlewares/existence';
import AuthMiddleware from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(AuthMiddleware.isAuthenticated, FavoritesController.getByUser)

router
    .route('/:id')
    .get(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.recipe, FavoritesController.create)
    .delete(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.recipe, FavoritesController.delete)


export {router as FavoritesRouter};

