import OrderModel from '@/models/OrderModel';
import OrderApi from '@/apis/OrderApi';
import { makeAutoObservable } from 'mobx';
import { BaseStore } from './BaseStore';

class CartStore extends BaseStore {
  cart: OrderModel;

  constructor() {
    super();
    makeAutoObservable(this);
  }

  async load() {
    this.isLoading = true;
    try {
      const result = await OrderApi.getCart();

      this.cart = OrderModel.create(result.data);
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new CartStore();
