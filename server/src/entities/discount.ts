import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DateBasicEntity } from './base_entity';
import Product from './product';

@Entity({ name: 'discounts' })
class Discount extends DateBasicEntity {
  @Column()
  rate: number;

  @Column()
  product_id: number;

  @OneToOne((type) => Product, (product) => product.discount)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default Discount;
