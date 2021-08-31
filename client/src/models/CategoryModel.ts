import { CategorySchema } from '@shared/dtos/category/schema';

export default class CategoryModel implements CategorySchema {
  id: number;
  name: string;
  linkedName: string;
  level: number;
  parentId: number;
  childrenId: number[];

  constructor(dto: CategorySchema) {
    Object.assign(this, dto);
  }

  static create(dto: CategorySchema) {
    return new CategoryModel(dto);
  }
}
