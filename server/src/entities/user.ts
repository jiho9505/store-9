import { Column, Entity, OneToMany } from 'typeorm';
import { DateBasicEntity } from './base_entity';
import Like from './like';
import Order from './order';
import QnA from './qna';
import Review from './review';

export enum User_Role {
  Master = 'Master',
  Admin = 'Admin',
  User = 'User',
  NotUser = 'NotUser',
}

@Entity({ name: 'users' })
class User extends DateBasicEntity {
  @Column({ type: 'enum', enum: User_Role })
  role: User_Role;

  @Column({ unique: true })
  login_id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  birth: Date;

  @Column()
  address: string;

  @Column({ nullable: true })
  call_number: string;

  @OneToMany((type) => Like, (like) => like.user)
  likes: Like[];

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];

  @OneToMany((type) => QnA, (qna) => qna.user)
  qnas: QnA[];

  @OneToMany((type) => Review, (review) => review.user)
  reviews: Review[];
}

export default User;
