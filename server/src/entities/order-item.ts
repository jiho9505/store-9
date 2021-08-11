import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DateBaseModel } from "./base-model";
import Product from "./product";
import User from "./user";

@Entity({ name: "order-items" })
class OrderItem extends DateBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => Product, (product) => product.id)
  product: Product;

  @Column()
  amount: number;
}

export default OrderItem;
