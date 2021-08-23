import { ProductSchema } from '../product/schema';

export interface OrderItemSchema<Option = any> {
  id: number;
  orderId?: number;
  amount: number;
  option?: Option;
  product?: ProductSchema;
}
