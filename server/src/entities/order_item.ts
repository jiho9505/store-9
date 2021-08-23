import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateBasicEntity } from './base_entity';
import Order from './order';
import Product from './product';

@Entity({ name: 'order_items' })
class OrderItem extends DateBasicEntity {
  @Column({ type: 'numeric' })
  amount: number;

  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @ManyToOne((type) => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne((type) => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default OrderItem;
