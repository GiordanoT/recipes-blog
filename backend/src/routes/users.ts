import {Router} from 'express';
import UsersController from '../controllers/users';
import ExistenceMiddleware from '../middlewares/existence';
import IdMiddleware from "../middlewares/id";

const router = Router();

router
    .route('/')
    .get(UsersController.getAll)

router
    .route('/:id')
    .get(IdMiddleware.validate, ExistenceMiddleware.user, UsersController.getOne)
    .patch(IdMiddleware.validate, ExistenceMiddleware.user, UsersController.update)

export {router as UsersRouter};

