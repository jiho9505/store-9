import { ProductDetailSchema, ProductSchema } from './schema';

namespace ProductResponse {
  export type GetMain = {
    bestProducts: ProductSchema[];
    newProducts: ProductSchema[];
    recommendProducts: ProductSchema[];
    discountProducts: ProductSchema[];
  };

  export type GetList = ProductSchema[];

  export type GetDetail = ProductSchema & {
    detail: ProductDetailSchema;
  };
}

export default ProductResponse;
