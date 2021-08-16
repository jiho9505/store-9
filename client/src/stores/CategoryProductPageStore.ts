import { makeAutoObservable } from 'mobx';

import { PageableStore } from './BaseStore';
import { ProductSortBy } from '@shared/dtos/product/schema';
import CategoryModel from '@/models/CategoryModel';
import ProductModel from '@/models/ProductModel';
import ProductApi from '@/apis/ProductApi';

class CategoryProductPageStore extends PageableStore<ProductModel[], ProductSortBy> {
  currentCategory: CategoryModel;
  categories: CategoryModel[];
  sortBy = ProductSortBy.RECOMMEND;
  searchQuery: string;

  constructor() {
    super();
    makeAutoObservable(this);
  }

  async load() {
    this.isLoading = true;
    try {
      const result = await ProductApi.getList({
        size: this.size,
        page: this.page,
        sortBy: this.sortBy,
        categoryId: this.currentCategory?.id,
        searchQuery: this.searchQuery,
      });

      this.list = result.data.map(ProductModel.create);
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  async search(value: string) {
    this.isLoading = true;
    this.page = 0;
    this.searchQuery = value;
    try {
      this.load();
    } catch (e) {
      this.isError = true;
    } finally {
      this.searchQuery = '';
    }
  }

  changeCategory(category: CategoryModel) {
    if (this.currentCategory.id !== category.id) {
      this.page = 0;
      this.currentCategory = category;
    }
  }
}

export default new CategoryProductPageStore();
