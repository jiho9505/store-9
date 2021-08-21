import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repositories/CategoryRepository';
import CategoryResponse from '../../../shared/dtos/category/response';
import { CategorySchema } from '../../../shared/dtos/category/schema';

namespace CategoryController {
  export const getCategories: RouteHandler<null, CategoryResponse.GetCategories> = async (
    req,
    res
  ) => {
    const categoires = await getCustomRepository(CategoryRepository).getCategories();

    const data = categoires.map<CategorySchema>((category) => ({
      id: category.id,
      name: category.name,
      level: category.level,
      parentId: category.parent_id,
    }));

    res.json({ ok: true, message: '카테고리 조회 ', data });
  };
}

export default CategoryController;
