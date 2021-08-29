import CategoryApi from '@/apis/CategoryApi';
import { makeAutoObservable } from 'mobx';

type CategoryType = {
  id: number;
  name: string;
  parentId: number | null;
}[];

class CaregoryStore {
  parentCategories: CategoryType = [];
  subCategories: CategoryType = [];
  productNames: string[];

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    try {
      const result = await CategoryApi.getCategories();
      if (result.ok) {
        this.parentCategories = result.data.parentCategories;
        this.subCategories = result.data.subCategories;
        this.productNames = result.data.productNames;
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}

export default new CaregoryStore();
