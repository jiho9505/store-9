import { getCustomRepository } from 'typeorm';

import OrderRequest from '../../../shared/dtos/order/request';
import OrderResponse from '../../../shared/dtos/order/response';
import OrderRepository from '../repositories/OrderRepository';

namespace OrderController {
  export const getList: RouteHandler<OrderRequest.GetList, OrderResponse.GetList> = async (
    req,
    res
  ) => {
    // login check 해야함
    try {
      const userId = res.locals?.user?.id || 1;
      const { startDate, endDate, size, page } = req.query;

      const results = await getCustomRepository(OrderRepository).getList({
        userId,
        startDate,
        endDate,
        size,
        page,
      });

      const orders = results.orders.reduce((acc, cur) => {
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

      res.json({
        ok: true,
        data: {
          orders,
          totalCount: results.totalCount,
        },
      });
    } catch (e) {
      console.error(e.message);

      res.status(500).json({ ok: false });
    }
  };

  export const order: RouteHandler<OrderRequest.Order> = async (req, res) => {
    try {
      // login check
      const userId = res.locals?.user?.id || 1;

      const result = await getCustomRepository(OrderRepository).order({ userId, ...req.body });

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
      // login check
      const userId = res.locals?.user?.id || 1;

      const order = await getCustomRepository(OrderRepository).getCart({ userId });

      res.json({
        ok: true,
        data: {
          id: order.id,
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
      const userId = res.locals?.user?.id || 1;
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
