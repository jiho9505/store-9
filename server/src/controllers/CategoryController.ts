import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repositories/CategoryRepository';
import CategoryResponse from '../../../shared/dtos/category/response';
import Category from '../entities/category';
import ProductRepository from '../repositories/ProductRepository';

namespace CategoryController {
  export const getCategories: RouteHandler<null, CategoryResponse.GetCategories> = async (
    req,
    res
  ) => {
    const categoires = await getCustomRepository(CategoryRepository).getCategories();
    const productNames = await getCustomRepository(ProductRepository).getProductNames();

    const createCategoryData = (category: Category) => ({
      id: category.id,
      name: category.name,
      parentId: category.parent_id,
    });

    const parentCategories = categoires
      .filter((category) => category.parent_id === null)
      .map(createCategoryData);
    const subCategories = categoires
      .filter((category) => category.parent_id !== null)
      .map(createCategoryData);

    res.json({
      ok: true,
      message: '카테고리 조회 ',
      data: {
        parentCategories,
        subCategories,
        productNames: Array.from(new Set(productNames.map(({ name }) => name).concat('지우개'))),
      },
    });
  };
}

export default CategoryController;
