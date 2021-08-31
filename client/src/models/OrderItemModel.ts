import { OrderItemSchema } from '@shared/dtos/order-item/schema';
import ProductModel from './ProductModel';

export default class OrderItemModel<Option = unknown> implements OrderItemSchema<Option> {
  id: number;
  orderId: number;
  amount: number;
  option: Option;
  product: ProductModel;

  constructor(dto: OrderItemSchema) {
    Object.assign(this, dto);
    this.product = ProductModel.create(dto.product);
  }

  static create(dto: OrderItemSchema) {
    return new OrderItemModel(dto);
  }
}
