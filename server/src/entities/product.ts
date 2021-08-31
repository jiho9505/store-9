import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { DateBasicEntity } from './base_entity';
import Like from './like';
import ProductDetail from './product_detail';
import QnA from './qna';
import Discount from './discount';
import Review from './review';
import Category from './category';

@Entity({ name: 'products' })
class Product extends DateBasicEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @Column({ type: 'decimal', nullable: true, default: 0 })
  stock?: number;

  @Column()
  category_id: number;

  @ManyToOne((type) => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne((type) => ProductDetail, (productDatail) => productDatail.product)
  detail: ProductDetail;

  @OneToOne((type) => Discount, (discount) => discount.product)
  discount: Discount;

  @OneToMany((type) => Like, (like) => like.product)
  likes: Like[];

  @OneToMany((type) => QnA, (qna) => qna.product)
  qnas: QnA[];

  @OneToMany((type) => Review, (review) => review.product)
  reviews: Review[];
}

export default Product;
