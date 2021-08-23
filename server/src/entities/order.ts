import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { OrderStatus } from '../../../shared/dtos/order/schema';
import { DateBasicEntity } from './base_entity';
import User from './user';
import OrderItem from './order_item';

@Entity({ name: 'orders' })
class Order extends DateBasicEntity {
  @Column({ type: 'enum', enum: OrderStatus })
  status!: OrderStatus;

  @Column()
  hasShippingCharge: boolean;

  @Column()
  user_id: number;

  @ManyToOne((type) => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}

export default Order;
