import { Router } from 'express';

import AuthRouter from './AuthRouter';
import CategoryRouter from './CategoryRouter';
import ProductRouter from './ProductRouter';
import UserRouter from './UserRouter';
import ReviewRouter from './ReviewRouter';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/reviews', ReviewRouter);
ApiRouter.use('/users', UserRouter);
ApiRouter.use('/products', ProductRouter);
ApiRouter.use('/categories', CategoryRouter);

export default ApiRouter;
