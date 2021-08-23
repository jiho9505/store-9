import { ProductDetailSchema } from '@shared/dtos/product/schema';

export default class ProductDetailModel implements ProductDetailSchema {
  id: number;
  name: string;
  kind: string;
  material: string;
  color: string;
  size: string;
  manufacturer: string;
  country: string;
  caution: string;
  target_customer: string;
  guaranteed: string;
  customer_center: string;

  constructor(dto: ProductDetailSchema) {
    Object.assign(this, dto);
  }

  static create(dto: ProductDetailSchema) {
    return new ProductDetailModel(dto);
  }
}
