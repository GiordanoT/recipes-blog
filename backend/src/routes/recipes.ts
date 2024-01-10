import {Router} from 'express';
import ExistenceMiddleware from '../middlewares/existence';
import IdMiddleware from '../middlewares/id';
import RecipesController from '../controllers/recipes';
import AuthMiddleware from '../middlewares/auth';
import PermissionsMiddleware from '../middlewares/permissions';

const router = Router();

router
    .route('/mine')
    .get(AuthMiddleware.isAuthenticated, RecipesController.getByAuthor)

router
    .route('/search')
    .post(RecipesController.getByName)

router
    .route('/')
    .get(RecipesController.getAll)
    .post(AuthMiddleware.isAuthenticated, RecipesController.create)

router
    .route('/:id')
    .get(IdMiddleware.validate, ExistenceMiddleware.recipe, RecipesController.getOne)
    .patch(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.recipe, PermissionsMiddleware.isAuthor, RecipesController.update)
    .delete(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.recipe, PermissionsMiddleware.isAuthor, RecipesController.delete)


export {router as RecipesRouter};

