import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth';

import OrderController from '../controllers/OrderController';

const OrderRouter = Router();

OrderRouter.use(AuthMiddleware.checkLogin);
OrderRouter.get('/', OrderController.getList);
OrderRouter.post('/', OrderController.order);
OrderRouter.delete('/:orderId', OrderController.cancel);
OrderRouter.get('/cart', OrderController.getCart);
OrderRouter.post('/cart', OrderController.addCartItem);
OrderRouter.put('/cart', OrderController.updateCartItem);
OrderRouter.delete('/cart/:orderItemId', OrderController.removeCartItem);

export default OrderRouter;
