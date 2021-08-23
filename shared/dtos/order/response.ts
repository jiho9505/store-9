import { OrderItemSchema } from '../order-item/schema';
import { OrderSchema } from './schema';

namespace OrderResponse {
  export type GetList = OrderSchema[];

  export type GetCart = OrderSchema;

  export type AddCartItem = OrderItemSchema;
}

export default OrderResponse;
