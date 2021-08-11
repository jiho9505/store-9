import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { DateBaseModel } from "./base-model";
import Like from "./like";
import OrderItem from "./order-item";
import Product from "./product";

@Entity({ name: "users" })
class User extends DateBaseModel {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  birth: Date;

  @Column()
  address: string;

  @Column({ nullable: true })
  call_number: string;

  @OneToMany((type) => Product, (product) => product.id)
  @JoinColumn()
  orderItems: OrderItem[];

  @OneToMany((type) => Like, (like) => like.user)
  likes!: Like[];
}

export default User;
