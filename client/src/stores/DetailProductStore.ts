import { makeAutoObservable } from 'mobx';
import ProductApi from '@/apis/ProductApi';
import ProductResponse from '@shared/dtos/product/response';

class DetailProductStore {
  product: ProductResponse.GetDetail;

  constructor() {
    makeAutoObservable(this);
  }

  load = async (productId: number) => {
    try {
      const result = await ProductApi.getDetail({ productId });
      if (result.ok) this.product = result.data;
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export default new DetailProductStore();
