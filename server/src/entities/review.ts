import { Column, Entity, ManyToOne } from "typeorm";
import { DateBaseModel } from "./base-model";
import Product from "./product";
import User from "./user";

Entity({ name: "reviews" });
class Review extends DateBaseModel {
  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => Product, (product) => product.id)
  product: Product;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  images: string;
}

export default Review;
