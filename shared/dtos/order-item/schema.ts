import { ProductSchema } from '../product/schema';

export interface OrderItemSchema<Option = any> {
  id: number;
  order_id?: number;
  amount: number;
  option?: Option;
  product?: ProductSchema;
}
