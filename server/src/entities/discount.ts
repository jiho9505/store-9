import { Column, Entity, OneToOne } from 'typeorm';
import { DateBasicEntity } from './base_entity';
import Product from './product';

@Entity({ name: 'discounts' })
class Discount extends DateBasicEntity {
  @Column()
  rate: number;

  @OneToOne((type) => Product, (product) => product.discount)
  product: Product;
}

export default Discount;
