import { getCustomRepository } from 'typeorm';
import OrderRequest from '../../../shared/dtos/order/request';
import OrderResponse from '../../../shared/dtos/order/response';
import OrderRepository from '../repositories/OrderRepository';

const getList: RouteHandler<OrderRequest.GetList, OrderResponse.getList> = async (req, res) => {
  try {
    const result = await getCustomRepository(OrderRepository).getList({ userId: 1 });

    res.send(result);
  } catch (e) {
    console.error(e);

    res.status(500).json({ ok: false });
  }
};

const order: RouteHandler<OrderRequest.Order> = async (req, res) => {
  try {
    const { orderId } = req.body;

    const result = await getCustomRepository(OrderRepository).order({ orderId });

    res.json({ ok: result.affected > 0 });
  } catch (e) {
    console.error(e);

    res.status(500).json({ ok: false });
  }
};

const cancel: RouteHandler<OrderRequest.Cancel> = async (req, res) => {
  try {
    const { orderId } = req.params;

    const result = await getCustomRepository(OrderRepository).cancel({ orderId });

    res.json({ ok: result.affected > 0 });
  } catch (e) {
    console.error(e);

    res.status(500).json({ ok: false });
  }
};

const getCart: RouteHandler<OrderRequest.Order, OrderResponse.getCart> = async (req, res) => {
  try {
    const { userId = 1 } = res.locals;

    const result = await getCustomRepository(OrderRepository).getCart({ userId });

    res.json({
      ok: true,
      data: {
        id: result.id,
        status: result.status,
        orderItems: result.items.map((orderItem) => ({
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

const addCartItem: RouteHandler<OrderRequest.AddCartItem> = async (req, res) => {
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

const updateCartItem: RouteHandler<OrderRequest.UpdateCartItem> = async (req, res) => {
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

const removeCartItem: RouteHandler<OrderRequest.RemoveCartItem> = async (req, res) => {
  try {
    const { orderItemId } = req.params;

    const result = await getCustomRepository(OrderRepository).removeCartItem({ orderItemId });

    res.json({ ok: result.affected > 0 });
  } catch (e) {
    console.error(e);

    res.status(500).json({ ok: false });
  }
};

const OrderController = {
  getList,
  order,
  cancel,
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
};

export default OrderController;
