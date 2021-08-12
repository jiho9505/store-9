import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DateBaseModel } from './base-model';
import OrderItem from './order-item';
import User from './user';

export enum Order_Status {
  InCart = 'InCart',
  Before_Payment = 'Before_Payment',
  After_Payment = 'After_Payment',
  Shipping = 'Shipping',
  Shipping_Complete = 'Shipping_Complete',
  Purchasing_Complete = 'Purchasing_Complete',
}

@Entity({ name: 'orders' })
class Order extends DateBaseModel {
  @Column({ type: 'enum', enum: Order_Status })
  status!: Order_Status;

  @ManyToOne((type) => User, (user) => user.orders)
  @JoinColumn()
  user!: User;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @Column()
  hasShippingCharge: boolean;
}

export default Order;
