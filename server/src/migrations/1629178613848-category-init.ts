import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import Category from '../entities/category';
import Product from '../entities/product';
import User from '../entities/user';
import { level1CategorySeed, level2CategorySeed } from './seeds/category.seed';
import productSeed from './seeds/product.seed';
import userSeed from './seeds/user.seed';

export class categoryInit1629178613848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const CategoryRepository = getRepository(Category);
    const UserRepository = getRepository(User);
    const ProductRepository = getRepository(Product);

    const result = await Promise.all(
      level1CategorySeed.map((seed) =>
        CategoryRepository.save({ name: seed.name, level: seed.level })
      )
    );

    await Promise.all(
      level2CategorySeed.map((seed) =>
        CategoryRepository.save({
          name: seed.name,
          level: seed.level,
          parent: result.find((level1) => level1.name === seed.parentName),
        })
      )
    );

    await Promise.all(
      userSeed.map((seed) => {
        UserRepository.save(seed);
      })
    );

    await Promise.all(
      productSeed.map((seed) => {
        ProductRepository.save(seed);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
