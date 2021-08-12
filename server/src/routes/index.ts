import { Router } from 'express';
import AuthRouter from './auth';
import ProductRouter from './product';
import UserRouter from './users';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/users', UserRouter);
ApiRouter.use('/products', ProductRouter);

export default ApiRouter;
