import { makeAutoObservable } from 'mobx';
import ProductApi from '@/apis/ProductApi';

const alertMsg = '상품을 불러오는데 실패하였습니다.';

class DetailProductStore {
  products = {
    reviews: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  load = async (productId: number) => {
    try {
      const result = await ProductApi.getDetail({ productId });
      if (result.ok) this.products = result.data;
    } catch (e) {
      alert(alertMsg);
    }
  };

  async getReviews() {
    return this.products;
  }
}

export default new DetailProductStore();
