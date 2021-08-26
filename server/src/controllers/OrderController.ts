import { getCustomRepository } from 'typeorm';
import { JwtSignPayload } from '../utils/types';
import OrderRequest from '../../../shared/dtos/order/request';
import OrderResponse from '../../../shared/dtos/order/response';
import OrderRepository from '../repositories/OrderRepository';

namespace OrderController {
  export const getList: RouteHandler<OrderRequest.GetList, OrderResponse.GetList> = async (
    req,
    res
  ) => {
    // const { start, end } = req.query;
    const user: JwtSignPayload = res.locals.user;
    const { startDate, endDate, size, page } = req.query;
    try {
      // const result = await getCustomRepository(OrderRepository).getList({ userId: 1, start, end });
      // console.log(result);
      // res.send(result);
      const results = await getCustomRepository(OrderRepository).getList({
        userId: user.id,
        start: startDate,
        end: endDate,
        size,
        page,
      });

      const data = results.reduce((acc, cur) => {
        const lastOrder = acc[acc.length - 1];

        if (lastOrder?.id === cur.id) {
          lastOrder.orderItems.push({
            productName: cur.name,
            thumbnail: cur.thumbnail,
            price: cur.price,
            amount: cur.amount,
            isReviewed: cur.is_reviewed,
          });

          return acc;
        } else {
          return acc.concat({
            id: cur.id,
            updatedAt: cur.updated_at,
            orderItems: [
              {
                productName: cur.name,
                thumbnail: cur.thumbnail,
                price: cur.price,
                amount: cur.amount,
                isReviewed: cur.is_reviewed,
              },
            ],
          });
        }
      }, []);

      res.json({ ok: true, data });
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

      res.json({
        ok: true,
        data: {
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

      const result = await getCustomRepository(OrderRepository).removeCartItem({ orderItemId });

      res.json({ ok: result.affected > 0 });
    } catch (e) {
      console.error(e);

      res.status(500).json({ ok: false });
    }
  };
}

export default OrderController;
