import { EntityRepository, Repository } from 'typeorm';
import { OrderStatus } from '../../../shared/dtos/order/schema';
import Order from '../entities/order';
import OrderItem from '../entities/order_item';

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
  async getList({
    userId,
    page = 0,
    size = 20,
    startDate = new Date(0),
    endDate = new Date(),
  }: {
    userId: number;
    status?: OrderStatus;
    size?: number;
    page?: number;
    startDate?: Date | string;
    endDate?: Date | string;
  }) {
    const start = new Date(new Date(startDate).setHours(0, 0, 0, 0)).toJSON();
    const end = new Date(new Date(endDate).setHours(23, 59, 59, 59)).toJSON();

    const orders = await this.query(`
      SELECT o.*, p.id as product_id, p.name, p.thumbnail, p.price, oi.amount, r.id as is_reviewed
      FROM orders o
      INNER JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      LEFT JOIN reviews r ON r.product_id = p.id
      WHERE o.user_id = ${userId} AND DATE(o.created_at) BETWEEN '${start}' AND '${end}'
      AND o.status != '${OrderStatus.IN_CART}'
      ORDER BY updated_at DESC
      LIMIT ${size}
      OFFSET ${page * size}
    `);

    const totalCount = await this.query(`
      SELECT count(joi.id) AS count 
      FROM orders o
      LEFT JOIN (
        SELECT *
        FROM order_items
      ) joi
      ON o.id = joi.order_id
      WHERE o.user_id = ${userId} AND DATE(o.created_at) BETWEEN '${start}' AND '${end}'
      AND o.status != '${OrderStatus.IN_CART}'
      GROUP BY o.user_id
    `);

    return { orders, totalCount: Number(totalCount[0].count) };
  }

  order({
    userId,
    buyerName,
    phone,
    email,
    receiverName,
    receiverAddress,
    receiverPhone,
  }: {
    userId: number;
    buyerName: string;
    phone: string;
    email: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
  }) {
    const result = this.createQueryBuilder()
      .update({
        status: OrderStatus.PURCHASING_COMPLETE,
        buyerName,
        phone,
        email,
        receiverName,
        receiverAddress,
        receiverPhone,
      })
      .where(`user_id = ${userId}`)
      .execute();

    return result;
  }

  getCart({ userId }: { userId: number }) {
    const result = this.createQueryBuilder('o')
      .where(`o.user_id = ${userId} AND o.status = '${OrderStatus.IN_CART}'`)
      .leftJoinAndSelect('o.items', 'item')
      .leftJoinAndSelect('item.product', 'product')
      .getOne();

    return result;
  }

  async addCartItem({
    productId,
    userId,
    amount,
  }: {
    productId: number;
    userId: number;
    amount: number;
  }) {
    const cart = await this.createQueryBuilder('o')
      .where(`o.user_id = ${userId} AND o.status = '${OrderStatus.IN_CART}'`)
      .getOne();

    const result = await OrderItem.create({
      amount,
      order_id: cart.id,
      product_id: productId,
    }).save();

    return result;
  }

  async updateCartItem({ orderItemId, amount }: { orderItemId: number; amount: number }) {
    const result = await OrderItem.createQueryBuilder('oi')
      .update({
        amount,
      })
      .whereInIds(orderItemId)
      .execute();

    return result;
  }

  async removeCartItem({ orderItemId }: { orderItemId: number[] }) {
    const result = await OrderItem.delete(orderItemId);

    return result;
  }
}
