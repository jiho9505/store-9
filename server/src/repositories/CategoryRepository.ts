import { EntityRepository, Repository } from 'typeorm';

import Category from '../entities/category';

@EntityRepository(Category)
export default class CategoryRepository extends Repository<Category> {
  async getCategories() {
    return this.createQueryBuilder('c')
      .select(['c.id', 'c.level', 'c.name', 'c.parent_id'])
      .getMany();
  }

  async createCategory({ level, name, parent_id }) {
    if (level === 1 || level === undefined) {
      return this.query(`
        INSERT INTO categories (level, name)
        VALUES (1, ${name})
      `);
    } else {
      return this.query(`
        INSERT INTO categories (level, name, parent_id)
        VALUES (${level}, ${name}, ${parent_id})
      `);
    }
  }
}
