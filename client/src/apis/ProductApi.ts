import ProductRequest from '@shared/dtos/product/request';
import ProductResponse from '@shared/dtos/product/response';
import BaseApi from './BaseApi';

class ProductAPI extends BaseApi {
  getMain() {
    return this.get<ProductResponse.GetMain>('/');
  }

  getList(params: ProductRequest.GetList) {
    return this.get<ProductResponse.GetList>('/', { params });
  }

  getDetail({ productId }: ProductRequest.GetDetail) {
    return this.get<ProductResponse.GetDetail>(`/${productId}`);
  }
}

export default new ProductAPI('products');
