import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

export class DateBaseModel extends BaseModel {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
