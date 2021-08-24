import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateBasicEntity } from './base_entity';
import Product from './product';
import User from './user';

@Entity({ name: 'reviews' })
class Review extends DateBasicEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  images: string;

  @Column({ unique: true })
  user_id: number;

  @Column({ unique: true })
  product_id: number;

  @Column()
  rate: number;

  @ManyToOne((type) => User, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Product, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default Review;
