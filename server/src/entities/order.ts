import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DateBaseModel } from "./base-model";
import OrderItem from "./order-item";
import User from "./user";

@Entity({ name: "orders" })
class Order extends DateBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id!: number;

  @ManyToOne((type) => User, (user) => user.products)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.id)
  items: OrderItem[];

  @Column()
  has배송비: boolean;
}

export default Order;
