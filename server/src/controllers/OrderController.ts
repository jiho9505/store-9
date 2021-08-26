import { getCustomRepository } from 'typeorm';
import OrderRequest from '../../../shared/dtos/order/request';
import OrderResponse from '../../../shared/dtos/order/response';
import OrderRepository from '../repositories/OrderRepository';

namespace OrderController {
  export const getList: RouteHandler<OrderRequest.GetList, OrderResponse.GetList> = async (
    req,
    res
  ) => {
    const { startDate, endDate } = req.query;
    try {
      const result = await getCustomRepository(OrderRepository).getList({
        userId: 1,
        startDate,
        endDate,
      });
      res.send(result);
    } catch (e) {
      console.error(e.message);

      res.status(500).json({ ok: false });
    }
  };

  export const order: RouteHandler<OrderRequest.Order> = async (req, res) => {
    try {
      const { orderId } = req.body;

      const result = await getCustomRepository(OrderRepository).order({ orderId });

      res.json({ ok: result.affected > 0 });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const cancel: RouteHandler<OrderRequest.Cancel> = async (req, res) => {
    try {
      const { orderId } = req.params;

      const result = await getCustomRepository(OrderRepository).cancel({ orderId });

      res.json({ ok: result.affected > 0 });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const getCart: RouteHandler<OrderRequest.Order, OrderResponse.GetCart> = async (
    req,
    res
  ) => {
    try {
      const { userId = 1 } = res.locals;

      const order = await getCustomRepository(OrderRepository).getCart({ userId });
      if (!order) {
        res.json({ ok: true, data: {} });
        return;
      }
      res.json({
        ok: true,
        data: {
          order: {
            id: order.id,
            status: order.status,
            orderItems: order.items.map((orderItem) => ({
              id: orderItem.id,
              amount: orderItem.amount,
              product: {
                id: orderItem.product.id,
                name: orderItem.product.name,
                price: orderItem.product.price,
                thumbnail: orderItem.product.thumbnail,
              },
            })),
          },
        },
      });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const addCartItem: RouteHandler<OrderRequest.AddCartItem> = async (req, res) => {
    try {
      const { userId = 1 } = res.locals;
      const { productId, amount } = req.body;

      await getCustomRepository(OrderRepository).addCartItem({
        productId,
        amount,
        userId,
      });

      res.json({ ok: true });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const updateCartItem: RouteHandler<OrderRequest.UpdateCartItem> = async (req, res) => {
    try {
      const { orderItemId, amount } = req.body;

      const result = await getCustomRepository(OrderRepository).updateCartItem({
        orderItemId,
        amount,
      });

      res.json({ ok: result.affected > 0 });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };

  export const removeCartItem: RouteHandler<OrderRequest.RemoveCartItem> = async (req, res) => {
    try {
      const { orderItemId } = req.params;
      const orderItemIdArray = `${orderItemId}`.split(',').map(Number);
      const result = await getCustomRepository(OrderRepository).removeCartItem({
        orderItemId: orderItemIdArray,
      });

      res.json({ ok: result.affected > 0 });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };
}

export default OrderController;
