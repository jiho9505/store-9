import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/auth';
import FileMiddleware from '../middlewares/file';
const AuthRouter = Router();

AuthRouter.get('/check', AuthMiddleware.checkLogin, AuthController.authorize);
AuthRouter.post('/login', FileMiddleware.dataUpload, AuthController.login);
AuthRouter.post('/signup', FileMiddleware.dataUpload, AuthController.signup);
AuthRouter.get('/logout', AuthMiddleware.checkLogin, AuthController.logout);
AuthRouter.post('/github', AuthMiddleware.githubAuthInitialRequest, AuthController.githubLogin);

export default AuthRouter;
