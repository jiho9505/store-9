import { Entity, Column, OneToOne } from 'typeorm';
import { DateBasicEntity } from './base_entity';
import Product from './product';

@Entity({ name: 'product_details' })
class ProductDetail extends DateBasicEntity {
  @OneToOne((type) => Product, (product) => product.detail)
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
