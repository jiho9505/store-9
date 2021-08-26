import { Router } from 'express';

import OrderController from '../controllers/OrderController';

const OrderRouter = Router();

OrderRouter.get('/', OrderController.getList);
OrderRouter.post('/', OrderController.order);
OrderRouter.get('/cart', OrderController.getCart);
OrderRouter.post('/cart', OrderController.addCartItem);
OrderRouter.put('/cart', OrderController.updateCartItem);
OrderRouter.delete('/cart/:orderItemId', OrderController.removeCartItem);

export default OrderRouter;
