import { OrderItemSchema } from '../order-item/schema';

export enum OrderStatus {
  IN_CART = 'IN_CART',
  BEFORE_PAYEMNT = 'BEFORE_PAYEMNT',
  AFTER_PAYMENT = 'AFTER_PAYMENT',
  SHIPPING = 'SHIPPING',
  SHIPPING_COMPLETE = 'SHIPPING_COMPLETE',
  PURCHASING_COMPLETE = 'PURCHASING_COMPLETE',
}

export interface OrderSchema {
  id: number;
  userId: number;
  status: OrderStatus;
  isReviewed: boolean;
  orderItems: OrderItemSchema[];
  createdAt?: string;
}
