import { Router } from 'express';

import AuthRouter from './AuthRouter';
import CategoryRouter from './CategoryRouter';
import ProductRouter from './ProductRouter';
import UserRouter from './UserRouter';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/users', UserRouter);
ApiRouter.use('/products', ProductRouter);
ApiRouter.use('/categories', CategoryRouter);

export default ApiRouter;
