import { PageRequest } from '../base/request';
import { ProductSortBy } from './schema';

namespace ProductRequest {
  export type GetList = PageRequest<ProductSortBy> & {
    categoryId?: number;
    searchQuery?: string;
  };

  export type GetDetail = {
    productId: number;
  };
}

export default ProductRequest;
