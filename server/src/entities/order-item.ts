import { Column, Entity, ManyToOne } from 'typeorm';
import { DateBaseModel } from './base-model';
import Order from './order';
import Product from './product';

@Entity({ name: 'order-items' })
class OrderItem extends DateBaseModel {
  @ManyToOne((type) => Order, (order) => order.items)
  order: Order;

  @ManyToOne((type) => Product, (product) => product.id)
  product: Product;

  @Column()
  amount: number;
}

export default OrderItem;
