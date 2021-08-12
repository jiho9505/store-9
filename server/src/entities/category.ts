import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base-model';
import Product from './product';

@Entity({ name: 'categories' })
class Category extends BaseModel {
  @Column()
  level: number;

  @Column()
  name: string;

  @ManyToOne((type) => Category, (category) => category.children)
  parent: Category;

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[];

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];
}

export default Category;
