import CategoryResponse from '@shared/dtos/category/response';
import BaseApi from './BaseApi';

class CategoryApi extends BaseApi {
  getCategories() {
    return this.get<CategoryResponse.GetCategories>('/');
  }
}

export default new CategoryApi('/categories');
