import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/auth';
const AuthRouter = Router();

AuthRouter.post('/login', AuthMiddleware.dataUpload, AuthController.login);
AuthRouter.post('/signup', AuthMiddleware.dataUpload, AuthController.signup);
AuthRouter.get('/logout', AuthMiddleware.checkLogin, AuthController.logout);
AuthRouter.post('/github', AuthMiddleware.githubAuthInitialRequest, AuthController.githubLogin);

export default AuthRouter;
