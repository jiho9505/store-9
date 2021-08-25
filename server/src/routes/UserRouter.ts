import { Router } from 'express';

import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/auth';

const UserRouter = Router();

UserRouter.use(AuthMiddleware.checkLogin);

UserRouter.get('/');
UserRouter.get('/likes', UserController.getLikeLists);
UserRouter.delete('/likes', UserController.deleteLike);

export default UserRouter;
