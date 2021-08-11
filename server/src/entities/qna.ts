import { Column, Entity, ManyToOne } from "typeorm";
import { DateBaseModel } from "./base-model";
import Category from "./category";
import Product from "./product";
import User from "./user";

Entity({ name: "qnas" });
class QnA extends DateBaseModel {
  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => Product, (product) => product.id)
  product: Product;

  @ManyToOne((type) => Category, (category) => category.id)
  category: Category;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  isPrivate: boolean;
}

export default QnA;
