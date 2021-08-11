import { Column, Entity, OneToOne } from "typeorm";
import { DateBaseModel } from "./base-model";
import Product from "./product";

Entity({ name: "sales" });
class Sale extends DateBaseModel {
  @OneToOne((type) => Product, (product) => product.id)
  product: Product;

  @Column()
  rate: number;
}

export default Sale;
