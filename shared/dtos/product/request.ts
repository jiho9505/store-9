import { PageRequest } from '../base/request';
import { ProductSchema, ProductSortByType } from './schema';

namespace ProductRequest {
  export type GetList = PageRequest<ProductSortByType> & {
    categoryId?: number;
    search?: string;
  };

  export type GetDetail = {
    productId: number;
  };

  export type Create = Pick<ProductSchema, 'name' | 'price' | 'stock' | 'thumbnail' | 'content'> & {
    categoryId: number;
  };

  export type Remove = {
    productId: number;
  };
}

export default ProductRequest;
