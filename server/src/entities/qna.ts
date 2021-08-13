import { Column, Entity, ManyToOne } from 'typeorm';
import { DateBaseModel } from './base-model';
import Product from './product';
import User from './user';

@Entity({ name: 'qnas' })
class QnA extends DateBaseModel {
  @ManyToOne((type) => User, (user) => user.qnas)
  user: User;

  @ManyToOne((type) => Product, (product) => product.id)
  product: Product;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  isPrivate: boolean;

  @Column()
  images: string;
}

export default QnA;
