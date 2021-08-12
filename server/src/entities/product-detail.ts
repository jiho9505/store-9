import { Entity, Column, OneToOne } from "typeorm";
import { DateBaseModel } from "./base-model";
import Product from "./product";

@Entity({ name: "product-details" })
class ProductDetail extends DateBaseModel {
  @OneToOne((type) => Product, (product) => product.id)
  product: Product;

  @Column()
  name: string;

  @Column()
  kind: string;

  @Column()
  material: string;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  manufacturer: string;

  @Column()
  country: string;

  @Column()
  caution: string;

  @Column()
  target_customer: string;

  @Column()
  guaranteed: string;

  @Column()
  customer_center: string;
}

export default ProductDetail;
