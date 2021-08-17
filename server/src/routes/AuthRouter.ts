import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/signup', AuthController.signup);
AuthRouter.get('/logout', AuthController.login);

export default AuthRouter;
