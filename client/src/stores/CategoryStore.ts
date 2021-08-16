import CategoryModel from '@/models/CategoryModel';
import CategoryApi from '@/apis/CategoryApi';
import { makeAutoObservable } from 'mobx';
import { BaseStore } from './BaseStore';

class CaregoryStore extends BaseStore {
  categories: CategoryModel[];

  constructor() {
    super();
    makeAutoObservable(this);
  }

  async load() {
    this.isLoading = true;
    try {
      const result = await CategoryApi.getCategories();

      this.categories = result.data.map(CategoryModel.create);
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new CaregoryStore();
