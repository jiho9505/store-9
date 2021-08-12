import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseModel } from "./base-model";

@Entity({ name: "categories" })
class Category extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "smallint" })
  level: number;

  @Column()
  name: string;

  @ManyToOne((type) => Category, (category) => category.id)
  parent_id: number;

  @OneToMany((type) => Category, (category) => category.id)
  child_id: number;
}

export default Category;
