import { OrderItemSchema } from '../order-item/schema';

export enum OrderStatus {
  IN_CART = 'IN_CART',
  PURCHASING_COMPLETE = 'PURCHASING_COMPLETE',
}

export interface OrderSchema {
  id: number;
  userId?: number;
  status: OrderStatus;
  isReviewed?: boolean;
  orderItems: OrderItemSchema[];
  createdAt?: Date;
}
