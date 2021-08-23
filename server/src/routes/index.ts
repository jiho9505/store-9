import { Router } from 'express';

import AuthRouter from './AuthRouter';
import CategoryRouter from './CategoryRouter';
import OrderRouter from './OrderRouter';
import ProductRouter from './ProductRouter';
import QnARouter from './QnARouter';
import UserRouter from './UserRouter';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/users', UserRouter);
ApiRouter.use('/products', ProductRouter);
ApiRouter.use('/categories', CategoryRouter);
ApiRouter.use('/orders', OrderRouter);
ApiRouter.use('/qnas', QnARouter);

export default ApiRouter;
