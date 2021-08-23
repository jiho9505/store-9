import ProductModel from '@/models/ProductModel';
import ProductApi from '@/apis/ProductApi';
import { makeAutoObservable } from 'mobx';
import { BaseStore } from './BaseStore';

class MainPageStore extends BaseStore {
  bestProducts: ProductModel[];
  newProducts: ProductModel[];
  recommendProducts: ProductModel[];
  discountProducts: ProductModel[];

  constructor() {
    super();
    makeAutoObservable(this);
  }

  async load() {
    this.isLoading = true;
    try {
      const {
        data: { bestProducts, newProducts, recommendProducts, discountProducts },
      } = await ProductApi.getMain();

      this.bestProducts = bestProducts.map(ProductModel.create);
      this.newProducts = newProducts.map(ProductModel.create);
      this.recommendProducts = recommendProducts.map(ProductModel.create);
      this.discountProducts = discountProducts.map(ProductModel.create);
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new MainPageStore();
