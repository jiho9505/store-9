import { EntityRepository, Repository } from 'typeorm';
import { OrderStatus } from '../../../shared/dtos/order/schema';
import Order from '../entities/order';
import OrderItem from '../entities/order_item';

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
  getList({
    userId,
    status = OrderStatus.PURCHASING_COMPLETE,
    page = 0,
    size = 20,
  }: {
    userId: number;
    status?: OrderStatus;
    size?: number;
    page?: number;
  }) {
    console.log('a');
    const result = this.query(`
      SELECT o.*, p.id as product_id, p.name, p.thumbnail, p.price, oi.amount, r.id as is_reviewed
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      LEFT JOIN reviews r ON r.product_id = p.id
      WHERE o.user_id = ${userId} 
      AND o.status != '${OrderStatus.IN_CART}'
      ORDER BY updated_at DESC
      LIMIT ${size}
      OFFSET ${page * size}
    `);

    return result;
  }

  order({ orderId }: { orderId: number }) {
    const result = this.createQueryBuilder()
      .update({ status: OrderStatus.BEFORE_PAYEMNT })
      .whereInIds(orderId)
      .execute();

    return result;
  }

  async cancel({ orderId }: { orderId: number }) {
    const order = await this.createQueryBuilder('o')
      .whereInIds(orderId)
      .andWhere(`o.status = '${OrderStatus.BEFORE_PAYEMNT}'`)
      .getOne();

    const result = this.createQueryBuilder()
      .update({ status: OrderStatus.IN_CART })
      .whereEntity(order)
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

  async removeCartItem({ orderItemId }: { orderItemId: number }) {
    const result = await OrderItem.delete(orderItemId);

    return result;
  }
}
