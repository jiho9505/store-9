import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateBaseModel } from "./base-model";
import Product from "./product";
import User from "./user";

@Entity({ name: "likes" })
class Like extends DateBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id!: number;

  @Column()
  product_id!: number;

  @ManyToOne((type) => User, (user) => user.likes)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne((type) => Product, (product) => product.likes)
  @JoinColumn({ name: "product_id" })
  product!: Product;
}

export default Like;
