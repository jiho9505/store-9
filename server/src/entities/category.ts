import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasicEntity } from './base_entity';
import Product from './product';

@Entity({ name: 'categories' })
class Category extends BasicEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne((type) => Category, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[];

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];
}

export default Category;
