import { Column, Entity, OneToOne } from 'typeorm';
import { DateBaseModel } from './base-model';
import Product from './product';

@Entity({ name: 'discounts' })
class Discount extends DateBaseModel {
  @OneToOne((type) => Product, (product) => product.discount)
  product: Product;

  @Column()
  rate: number;
}

export default Discount;
