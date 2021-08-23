import { OrderSchema } from './schema';

namespace OrderResponse {
  export type getList = OrderSchema[];

  export type getCart = OrderSchema;
}

export default OrderResponse;
