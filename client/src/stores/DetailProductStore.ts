import { makeAutoObservable } from 'mobx';
import ProductApi from '@/apis/ProductApi';
import ProductResponse from '@shared/dtos/product/response';

class DetailProductStore {
  product: ProductResponse.GetDetail;
  errorOn: boolean;
  constructor() {
    makeAutoObservable(this);
  }

  load = async (productId: number) => {
    try {
      this.errorOn = false;
      const result = await ProductApi.getDetail({ productId });
      if (result.ok) this.product = result.data;
    } catch (e) {
      this.errorOn = true;
    }
  };
}

export default new DetailProductStore();
