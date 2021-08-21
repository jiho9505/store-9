import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DateBasicEntity } from './base_entity';
import Product from './product';
import User from './user';

@Entity({ name: 'qnas' })
class QnA extends DateBasicEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true, default: false })
  isPrivate: boolean;

  @Column({ nullable: true })
  images: string;

  @Column()
  user_id: number;

  @Column()
  product_id: number;

  @ManyToOne((type) => User, (user) => user.qnas)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default QnA;
