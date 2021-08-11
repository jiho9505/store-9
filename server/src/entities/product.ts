import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { DateBaseModel } from "./base-model";
import Like from "./like";
import User from "./user";

@Entity({ name: "products" })
class Product extends DateBaseModel {
  @Column()
  name: string;

  @Column({ type: "decimal" })
  price: number;

  @Column()
  thumbnail: string;

  @Column({ type: "decimal" })
  stock: number;

  @Column()
  content: string;

  @ManyToOne((type) => User, (user) => user.id)
  users: User;

  @OneToMany((type) => Like, (like) => like.product)
  likes!: Like[];
}

export default Product;
