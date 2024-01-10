import {Router} from 'express';
import ExistenceMiddleware from '../middlewares/existence';
import IdMiddleware from '../middlewares/id';
import CategoriesController from '../controllers/categories';
import RecipesController from '../controllers/recipes';

const router = Router();

router
    .route('/init')
    .get(CategoriesController.init)

router
    .route('/')
    .get(CategoriesController.getAll)

router
    .route('/:id')
    .get(IdMiddleware.validate, ExistenceMiddleware.category, CategoriesController.getOne)

router
    .route('/:id/recipes')
    .get(IdMiddleware.validate, ExistenceMiddleware.category, RecipesController.getByCategory)


export {router as CategoriesRouter};

