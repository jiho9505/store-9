import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { DateBaseModel } from './base-model';
import Like from './like';
import ProductDetail from './product-detail';
import QnA from './qna';
import Discount from './discount';
import User from './user';
import Review from './review';
import Category from './category';

@Entity({ name: 'products' })
class Product extends DateBaseModel {
  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  thumbnail: string;

  @Column({ type: 'decimal' })
  stock: number;

  @Column()
  content: string;

  @ManyToOne((type) => Category, (category) => category.products)
  category: Category;

  @OneToOne((type) => ProductDetail, (productDatail) => productDatail.product)
  @JoinColumn()
  detail: ProductDetail;

  @OneToOne((type) => Discount, (discount) => discount.product)
  @JoinColumn()
  discount: Discount;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @OneToMany((type) => Like, (like) => like.product)
  likes: Like[];

  @OneToMany((type) => QnA, (qna) => qna.product)
  qnas: QnA[];

  @OneToMany((type) => Review, (review) => review.product)
  reviews: Review[];
}

export default Product;
