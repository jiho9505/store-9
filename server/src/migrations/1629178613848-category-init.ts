import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import Category from '../entities/category';
import { level1CategorySeed, level2CategorySeed } from './seeds/category.seed';

export class categoryInit1629178613848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const CategoryRepository = getRepository(Category);

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE categories');
  }
}
