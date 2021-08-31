import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { OrderStatus } from '../../../shared/dtos/order/schema';
import { DateBasicEntity } from './base_entity';
import User from './user';
import OrderItem from './order_item';

@Entity({ name: 'orders' })
class Order extends DateBasicEntity {
  @Column({ type: 'enum', enum: OrderStatus })
  status!: OrderStatus;

  @Column({ default: false, nullable: true })
  hasShippingCharge: boolean;

  @Column({ nullable: true })
  buyerName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  receiverName: string;

  @Column({ nullable: true })
  receiverAddress: string;

  @Column({ nullable: true })
  receiverPhone: string;

  @Column()
  user_id: number;

  @ManyToOne((type) => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}

export default Order;
