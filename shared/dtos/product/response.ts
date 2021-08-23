import { ProductDetailSchema, ProductSchema } from './schema';

namespace ProductResponse {
  export type GetMain = {
    bestProducts: ProductSchema[];
    newProducts: ProductSchema[];
    recommendProducts: ProductSchema[];
    discountProducts: ProductSchema[];
  };

  export type GetList = {
    prodcuts: ProductSchema[];
    totalCount: number;
  };

  export type GetDetail = ProductSchema;

  export type Create = ProductSchema;
}

export default ProductResponse;
